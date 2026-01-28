import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, HuntItem } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';
import {
  generateHuntItems,
  toggleHuntItem,
  checkHuntComplete,
} from '../utils/huntLogic';

/**
 * Complete game state for both bingo and hunt modes
 */
export interface BingoGameState {
  gameState: GameState;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  huntItems: HuntItem[];
  huntComplete: boolean;
}

/**
 * Game action handlers
 */
export interface BingoGameActions {
  startGame: (mode?: 'bingo' | 'hunt') => void;
  handleSquareClick: (squareId: number) => void;
  handleHuntItemToggle: (itemId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameState: GameState;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  huntItems: HuntItem[];
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  // Validate version
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  // Validate gameState
  if (
    typeof obj.gameState !== 'string' ||
    !['start', 'playing', 'bingo', 'hunt', 'hunt-playing', 'hunt-complete'].includes(obj.gameState)
  ) {
    return false;
  }

  // Validate board
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }

  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });

  if (!validSquares) {
    return false;
  }

  // Validate winningLine
  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }

  // Validate huntItems
  if (!Array.isArray(obj.huntItems)) {
    return false;
  }

  const validHuntItems = obj.huntItems.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false;
    const huntItem = item as Record<string, unknown>;
    return (
      typeof huntItem.id === 'number' &&
      typeof huntItem.text === 'string' &&
      typeof huntItem.isChecked === 'boolean'
    );
  });

  return validHuntItems;
}

/**
 * Load and validate game state from localStorage
 * @returns Partial game state if valid, null otherwise
 */
function loadGameState(): Pick<BingoGameState, 'gameState' | 'board' | 'winningLine' | 'huntItems'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed: unknown = JSON.parse(saved);

    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        board: parsed.board,
        winningLine: parsed.winningLine,
        huntItems: parsed.huntItems,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

/**
 * Save game state to localStorage
 * @param gameState - Current game state mode
 * @param board - Current bingo board
 * @param winningLine - Current winning line or null
 * @param huntItems - Current hunt items
 */
function saveGameState(
  gameState: GameState,
  board: BingoSquareData[],
  winningLine: BingoLine | null,
  huntItems: HuntItem[]
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      board,
      winningLine,
      huntItems,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

/**
 * Main game hook - manages state for both bingo and hunt modes
 * Auto-persists to localStorage and handles game logic
 * @returns Combined game state and action handlers
 */

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [huntItems, setHuntItems] = useState<HuntItem[]>(
    () => loadedState?.huntItems || []
  );
  const [showBingoModal, setShowBingoModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  const huntComplete = useMemo(
    () => (gameState === 'hunt-complete' || (gameState === 'hunt-playing' && huntItems.length > 0 && checkHuntComplete(huntItems))),
    [gameState, huntItems]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, board, winningLine, huntItems);
  }, [gameState, board, winningLine, huntItems]);

  const startGame = useCallback((mode: 'bingo' | 'hunt' = 'bingo') => {
    if (mode === 'hunt') {
      setHuntItems(generateHuntItems());
      setBoard([]);
      setWinningLine(null);
      setGameState('hunt-playing');
    } else {
      setBoard(generateBoard());
      setWinningLine(null);
      setHuntItems([]);
      setGameState('playing');
    }
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const handleHuntItemToggle = useCallback((itemId: number) => {
    setHuntItems((currentItems) => {
      const newItems = toggleHuntItem(currentItems, itemId);
      
      // Check if hunt is complete
      if (checkHuntComplete(newItems)) {
        queueMicrotask(() => {
          setGameState('hunt-complete');
          setShowBingoModal(true);
        });
      }
      
      return newItems;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setWinningLine(null);
    setHuntItems([]);
    setShowBingoModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  return {
    gameState,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    huntItems,
    huntComplete,
    startGame,
    handleSquareClick,
    handleHuntItemToggle,
    resetGame,
    dismissModal,
  };
}
