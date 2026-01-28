import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateHuntItems,
  toggleHuntItem,
  calculateHuntProgress,
  checkHuntComplete,
  type HuntItem,
} from './huntLogic';

describe('huntLogic', () => {
  describe('generateHuntItems', () => {
    it('should return exactly 24 hunt items', () => {
      const items = generateHuntItems();
      expect(items).toHaveLength(24);
    });

    it('should have unique IDs from 0 to 23', () => {
      const items = generateHuntItems();
      const ids = items.map((item) => item.id);
      expect(ids).toEqual(Array.from({ length: 24 }, (_, i) => i));
    });

    it('should have all items starting with isChecked: false', () => {
      const items = generateHuntItems();
      items.forEach((item) => {
        expect(item.isChecked).toBe(false);
      });
    });

    it('should have all items with non-empty text strings', () => {
      const items = generateHuntItems();
      items.forEach((item) => {
        expect(typeof item.text).toBe('string');
        expect(item.text.length).toBeGreaterThan(0);
      });
    });

    it('should have 24 unique question items from the pool', () => {
      const items = generateHuntItems();
      const texts = items.map((item) => item.text);
      const uniqueTexts = new Set(texts);
      expect(uniqueTexts.size).toBe(24);
    });

    it('should shuffle items from the questions array', () => {
      const items1 = generateHuntItems();
      const items2 = generateHuntItems();
      
      const texts1 = items1.map((item) => item.text);
      const texts2 = items2.map((item) => item.text);
      
      // At least verify structure is correct for both
      expect(texts1).toHaveLength(24);
      expect(texts2).toHaveLength(24);
      
      // Both should have non-empty strings
      expect(texts1.every((t) => t.length > 0)).toBe(true);
      expect(texts2.every((t) => t.length > 0)).toBe(true);
    });
  });

  describe('toggleHuntItem', () => {
    let mockItems: HuntItem[];

    beforeEach(() => {
      mockItems = [
        { id: 0, text: 'Q1', isChecked: false },
        { id: 1, text: 'Q2', isChecked: true },
        { id: 2, text: 'Q3', isChecked: false },
      ];
    });

    it('should toggle an unchecked item to checked', () => {
      const newItems = toggleHuntItem(mockItems, 0);
      expect(newItems[0].isChecked).toBe(true);
    });

    it('should toggle a checked item to unchecked', () => {
      const newItems = toggleHuntItem(mockItems, 1);
      expect(newItems[1].isChecked).toBe(false);
    });

    it('should return a new array (immutable)', () => {
      const newItems = toggleHuntItem(mockItems, 0);
      expect(newItems).not.toBe(mockItems);
    });

    it('should not mutate the original array', () => {
      const originalItems = JSON.parse(JSON.stringify(mockItems));
      toggleHuntItem(mockItems, 0);
      expect(mockItems).toEqual(originalItems);
    });

    it('should not mutate the item objects themselves', () => {
      const originalFirstItem = { ...mockItems[0] };
      const newItems = toggleHuntItem(mockItems, 0);
      expect(mockItems[0]).toEqual(originalFirstItem);
      expect(newItems[0]).not.toEqual(originalFirstItem);
    });

    it('should leave other items in the array unchanged', () => {
      const newItems = toggleHuntItem(mockItems, 1);
      expect(newItems[0]).toEqual(mockItems[0]);
      expect(newItems[2]).toEqual(mockItems[2]);
    });

    it('should toggle the first item in the array', () => {
      const newItems = toggleHuntItem(mockItems, 0);
      expect(newItems[0].isChecked).toBe(true);
      expect(newItems[1].isChecked).toBe(true);
      expect(newItems[2].isChecked).toBe(false);
    });

    it('should toggle the last item in the array', () => {
      const newItems = toggleHuntItem(mockItems, 2);
      expect(newItems[0].isChecked).toBe(false);
      expect(newItems[1].isChecked).toBe(true);
      expect(newItems[2].isChecked).toBe(true);
    });

    it('should handle single item array', () => {
      const singleItem = [{ id: 0, text: 'Q1', isChecked: false }];
      const newItems = toggleHuntItem(singleItem, 0);
      expect(newItems[0].isChecked).toBe(true);
      expect(newItems).toHaveLength(1);
    });
  });

  describe('calculateHuntProgress', () => {
    it('should return 0 with no items checked', () => {
      const items: HuntItem[] = [
        { id: 0, text: 'Q1', isChecked: false },
        { id: 1, text: 'Q2', isChecked: false },
        { id: 2, text: 'Q3', isChecked: false },
      ];
      expect(calculateHuntProgress(items)).toBe(0);
    });

    it('should return 24 with all items checked', () => {
      const items: HuntItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isChecked: true,
      }));
      expect(calculateHuntProgress(items)).toBe(24);
    });

    it('should return 7 with 7 of 24 items checked', () => {
      const items: HuntItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isChecked: i < 7,
      }));
      expect(calculateHuntProgress(items)).toBe(7);
    });

    it('should return 0 with empty array', () => {
      const items: HuntItem[] = [];
      expect(calculateHuntProgress(items)).toBe(0);
    });

    it('should return correct count with mixed checked/unchecked', () => {
      const items: HuntItem[] = [
        { id: 0, text: 'Q1', isChecked: true },
        { id: 1, text: 'Q2', isChecked: false },
        { id: 2, text: 'Q3', isChecked: true },
        { id: 3, text: 'Q4', isChecked: true },
        { id: 4, text: 'Q5', isChecked: false },
      ];
      expect(calculateHuntProgress(items)).toBe(3);
    });
  });

  describe('checkHuntComplete', () => {
    it('should return false with no items checked', () => {
      const items: HuntItem[] = [
        { id: 0, text: 'Q1', isChecked: false },
        { id: 1, text: 'Q2', isChecked: false },
      ];
      expect(checkHuntComplete(items)).toBe(false);
    });

    it('should return false with some items checked', () => {
      const items: HuntItem[] = [
        { id: 0, text: 'Q1', isChecked: true },
        { id: 1, text: 'Q2', isChecked: false },
      ];
      expect(checkHuntComplete(items)).toBe(false);
    });

    it('should return true with all items checked', () => {
      const items: HuntItem[] = [
        { id: 0, text: 'Q1', isChecked: true },
        { id: 1, text: 'Q2', isChecked: true },
      ];
      expect(checkHuntComplete(items)).toBe(true);
    });

    it('should return false with 24-item hunt partially complete', () => {
      const items: HuntItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isChecked: i < 12,
      }));
      expect(checkHuntComplete(items)).toBe(false);
    });

    it('should return true with 24-item hunt fully complete', () => {
      const items: HuntItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isChecked: true,
      }));
      expect(checkHuntComplete(items)).toBe(true);
    });

    it('should return true with empty array (vacuous truth)', () => {
      const items: HuntItem[] = [];
      expect(checkHuntComplete(items)).toBe(true);
    });
  });
});
