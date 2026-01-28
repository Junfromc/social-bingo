import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

/**
 * Props for the GameScreen component
 * @property board - Array of bingo squares
 * @property winningSquareIds - Set of square IDs that are part of winning line
 * @property hasBingo - Whether a bingo has been achieved
 * @property onSquareClick - Callback when a square is clicked
 * @property onReset - Callback to reset game
 */
interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

/**
 * Game screen component for bingo mode
 * Displays the 5x5 bingo board with controls
 */
export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-3 bg-gray-900 border-b-2 border-accent">
        <button
          onClick={onReset}
          className="text-accent text-sm px-3 py-1.5 font-mono active:shadow-[0_0_10px_rgba(15,255,80,0.6)]"
        >
          [ ← BACK ]
        </button>
        <h1 className="font-bold text-accent font-mono">Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-accent text-sm py-2 px-4 font-mono border-b border-accent/30">
        &gt; Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-gray-900 text-accent text-center py-2 font-semibold text-sm border-b-2 border-accent font-mono shadow-lg shadow-accent/50">
          ✓ BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
