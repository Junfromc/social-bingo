import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

describe('useBingoGame - Hunt Mode Extensions', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('startGame with hunt mode', () => {
    it('should initialize hook with gameState: "start" by default', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
    });

    it('should set gameState to "hunt-playing" when calling startGame("hunt")', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.gameState).toBe('hunt-playing');
    });

    it('should set gameState to "playing" when calling startGame("bingo")', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('bingo');
      });

      expect(result.current.gameState).toBe('playing');
    });

    it('should initialize hunt items array when starting hunt mode', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.huntItems).toBeDefined();
      expect(result.current.huntItems).toHaveLength(24);
    });

    it('should have all hunt items unchecked initially', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      result.current.huntItems?.forEach((item) => {
        expect(item.isChecked).toBe(false);
      });
    });
  });

  describe('handleHuntItemToggle', () => {
    it('should toggle hunt item checked state', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      const initialState = result.current.huntItems?.[0]?.isChecked;

      act(() => {
        result.current.handleHuntItemToggle(0);
      });

      expect(result.current.huntItems?.[0]?.isChecked).toBe(
        !initialState
      );
    });

    it('should toggle different hunt items independently', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      act(() => {
        result.current.handleHuntItemToggle(0);
        result.current.handleHuntItemToggle(5);
      });

      expect(result.current.huntItems?.[0]?.isChecked).toBe(true);
      expect(result.current.huntItems?.[5]?.isChecked).toBe(true);
      expect(result.current.huntItems?.[3]?.isChecked).toBe(false);
    });

    it('should not mutate other items when toggling one', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      const otherItemsInitial = result.current.huntItems?.slice(1) || [];

      act(() => {
        result.current.handleHuntItemToggle(0);
      });

      const otherItemsAfter = result.current.huntItems?.slice(1) || [];

      otherItemsAfter.forEach((item, idx) => {
        expect(item.isChecked).toBe(otherItemsInitial[idx].isChecked);
      });
    });

    it('should persist hunt item toggle to localStorage', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      act(() => {
        result.current.handleHuntItemToggle(0);
      });

      const stored = localStorage.getItem('bingo-game-state');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored || '{}');
      expect(parsed.huntItems?.[0]?.isChecked).toBe(true);
    });
  });

  describe('Hunt completion state', () => {
    it('should set gameState to "hunt-complete" when all items are checked', async () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      // Toggle all 24 items
      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.handleHuntItemToggle(i);
        }
      });

      await waitFor(() => {
        expect(result.current.gameState).toBe('hunt-complete');
      });
    });

    it('should not set hunt-complete until all items are checked', async () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      // Toggle 23 items
      act(() => {
        for (let i = 0; i < 23; i++) {
          result.current.handleHuntItemToggle(i);
        }
      });

      expect(result.current.gameState).toBe('hunt-playing');

      // Toggle the last item
      act(() => {
        result.current.handleHuntItemToggle(23);
      });

      await waitFor(() => {
        expect(result.current.gameState).toBe('hunt-complete');
      });
    });

    it('should expose hunt completion status', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.huntComplete).toBe(false);

      // Toggle all items
      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.handleHuntItemToggle(i);
        }
      });

      expect(result.current.huntComplete).toBe(true);
    });
  });

  describe('Hunt state persistence', () => {
    it('should persist hunt state to localStorage with correct version', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      const stored = localStorage.getItem('bingo-game-state');
      const parsed = JSON.parse(stored || '{}');

      expect(parsed.version).toBeDefined();
      expect(parsed.gameState).toBe('hunt-playing');
      expect(parsed.huntItems).toHaveLength(24);
    });

    it('should restore hunt state from localStorage on mount', () => {
      // First render: start a hunt and make some toggles
      const { result: result1 } = renderHook(() => useBingoGame());

      act(() => {
        result1.current.startGame('hunt');
      });

      act(() => {
        result1.current.handleHuntItemToggle(0);
        result1.current.handleHuntItemToggle(5);
      });

      // Second render: should restore the same state
      const { result: result2 } = renderHook(() => useBingoGame());

      expect(result2.current.gameState).toBe('hunt-playing');
      expect(result2.current.huntItems?.[0]?.isChecked).toBe(true);
      expect(result2.current.huntItems?.[5]?.isChecked).toBe(true);
      expect(result2.current.huntItems?.[1]?.isChecked).toBe(false);
    });

    it('should validate hunt items in stored data', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      act(() => {
        result.current.handleHuntItemToggle(0);
      });

      const stored = localStorage.getItem('bingo-game-state');
      const parsed = JSON.parse(stored || '{}');

      // Verify structure
      expect(Array.isArray(parsed.huntItems)).toBe(true);
      parsed.huntItems.forEach((item: any) => {
        expect(typeof item.id).toBe('number');
        expect(typeof item.text).toBe('string');
        expect(typeof item.isChecked).toBe('boolean');
      });
    });
  });

  describe('resetGame with hunt mode', () => {
    it('should reset hunt progress and return to start', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      act(() => {
        result.current.handleHuntItemToggle(0);
        result.current.handleHuntItemToggle(5);
      });

      expect(result.current.gameState).toBe('hunt-playing');

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState).toBe('start');
      expect(result.current.huntItems).toEqual([]);
    });

    it('should clear all hunt item checks on reset', async () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      // Toggle all items to complete
      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.handleHuntItemToggle(i);
        }
      });

      await waitFor(() => {
        expect(result.current.gameState).toBe('hunt-complete');
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.huntComplete).toBe(false);
      expect(result.current.gameState).toBe('start');
    });

    it('should reset hunt state in localStorage', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      act(() => {
        result.current.handleHuntItemToggle(0);
      });

      act(() => {
        result.current.resetGame();
      });

      const stored = localStorage.getItem('bingo-game-state');
      const parsed = JSON.parse(stored || '{}');

      expect(parsed.gameState).toBe('start');
      expect(parsed.huntItems).toEqual([]);
    });
  });

  describe('Hunt vs Bingo mode isolation', () => {
    it('should not interfere with bingo board when in hunt mode', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.board).toHaveLength(0);
      expect(result.current.huntItems).toHaveLength(24);
    });

    it('should not interfere with hunt items when in bingo mode', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('bingo');
      });

      expect(result.current.board).toHaveLength(25);
      expect(result.current.huntItems).toEqual([]);
    });

    it('should switch from hunt to bingo mode', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.gameState).toBe('hunt-playing');

      act(() => {
        result.current.startGame('bingo');
      });

      expect(result.current.gameState).toBe('playing');
      expect(result.current.board).toHaveLength(25);
    });

    it('should switch from bingo to hunt mode', () => {
      const { result } = renderHook(() => useBingoGame());

      act(() => {
        result.current.startGame('bingo');
      });

      expect(result.current.gameState).toBe('playing');

      act(() => {
        result.current.startGame('hunt');
      });

      expect(result.current.gameState).toBe('hunt-playing');
      expect(result.current.huntItems).toHaveLength(24);
    });
  });
});
