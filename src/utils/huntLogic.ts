import { questions } from '../data/questions';
import type { HuntItem } from '../types';

// Re-export types for convenience
export type { HuntItem } from '../types';

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @template T - The type of array elements
 * @param array - The array to shuffle
 * @returns A new shuffled array without modifying the original
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate 24 hunt items from the questions array
 * Items are shuffled randomly and start unchecked
 * @returns Array of 24 HuntItem objects with unique IDs
 */
export function generateHuntItems(): HuntItem[] {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map((text, id) => ({
    id,
    text,
    isChecked: false,
  }));
}

/**
 * Toggle a hunt item's checked state
 * Returns a new array without mutating the original
 * @param items - The array of hunt items
 * @param itemId - The ID of the item to toggle
 * @returns A new array with the item toggled
 */
export function toggleHuntItem(items: HuntItem[], itemId: number): HuntItem[] {
  return items.map((item) =>
    item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
  );
}

/**
 * Calculate how many hunt items are currently checked
 * @param items - The array of hunt items
 * @returns The number of checked items (0-24)
 */
export function calculateHuntProgress(items: HuntItem[]): number {
  return items.filter((item) => item.isChecked).length;
}

/**
 * Check if the hunt is complete (all items checked)
 * @param items - The array of hunt items
 * @returns true if all items are checked, false otherwise
 */
export function checkHuntComplete(items: HuntItem[]): boolean {
  if (items.length === 0) {
    return true; // Vacuous truth
  }
  return items.every((item) => item.isChecked);
}
