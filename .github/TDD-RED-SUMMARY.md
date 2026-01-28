# TDD RED Phase: Scavenger Hunt Mode Test Summary

## Overview
Created comprehensive failing tests for Scavenger Hunt game mode in Social Bingo. All tests fail as expected because the implementation does not exist yet.

## Test Files Created

### 1. `src/utils/huntLogic.test.ts` ✅
**Purpose**: Pure function tests for hunt game logic
**Status**: ALL TESTS FAIL (module `huntLogic.ts` doesn't exist)
**Test Count**: 27 tests

#### Test Suites:
- **generateHuntItems()** — 6 tests
  - ✗ Returns exactly 24 hunt items
  - ✗ Has unique IDs from 0 to 23
  - ✗ All items start with `isChecked: false`
  - ✗ All items have non-empty text strings
  - ✗ Has 24 unique question items from pool
  - ✗ Shuffles items from questions array

- **toggleHuntItem()** — 9 tests
  - ✗ Toggles unchecked item to checked
  - ✗ Toggles checked item to unchecked
  - ✗ Returns new array (immutable)
  - ✗ Doesn't mutate original array
  - ✗ Doesn't mutate item objects themselves
  - ✗ Leaves other items unchanged
  - ✗ Toggles first item in array
  - ✗ Toggles last item in array
  - ✗ Handles single item array

- **calculateHuntProgress()** — 5 tests
  - ✗ Returns 0 with no items checked
  - ✗ Returns 24 with all items checked
  - ✗ Returns 7 with 7 of 24 checked
  - ✗ Returns 0 with empty array
  - ✗ Returns correct count with mixed checked/unchecked

- **checkHuntComplete()** — 7 tests
  - ✗ Returns false with no items checked
  - ✗ Returns false with some items checked
  - ✗ Returns true with all items checked
  - ✗ Returns false with 24-item hunt partially complete
  - ✗ Returns true with 24-item hunt fully complete
  - ✗ Returns true with empty array (vacuous truth)
  - ✗ Correctly identifies completion

---

### 2. `src/components/HuntScreen.test.tsx` ✅
**Purpose**: Component tests for hunt UI
**Status**: ALL TESTS FAIL (component `HuntScreen.tsx` doesn't exist)
**Test Count**: 15 tests

#### Test Coverage:
- ✗ Renders without crashing
- ✗ Displays all 24 hunt items as checkboxes
- ✗ Displays each hunt item text
- ✗ Shows checked state for initially checked items
- ✗ Calls `onItemToggle` when clicking checkbox
- ✗ Toggles checkbox state when clicked
- ✗ Displays progress meter with current count (e.g., "5/24")
- ✗ Displays progress meter with "0/24" when no items checked
- ✗ Renders Back button
- ✗ Calls `onBack` when Back button clicked
- ✗ Displays completion message when all items checked
- ✗ Doesn't display completion message when items remain unchecked
- ✗ Displays instructions text
- ✗ Renders items in scrollable container
- ✗ Updates progress when items toggled
- ✗ Renders title/header

---

### 3. `src/hooks/useBingoGame.test.ts` ✅
**Purpose**: Hook tests for hunt mode state management
**Status**: FAILS WHERE HUNT FEATURES TESTED (hook exists but lacks hunt support)
**Test Count**: 32 tests

#### Test Suites:
- **startGame with hunt mode** — 5 tests
  - ✗ Initializes with `gameState: "start"` by default
  - ✗ Sets `gameState: "hunt-playing"` when calling `startGame("hunt")`
  - ✗ Sets `gameState: "playing"` when calling `startGame("bingo")`
  - ✗ Initializes hunt items array when starting hunt mode
  - ✗ All hunt items unchecked initially

- **handleHuntItemToggle** — 4 tests
  - ✗ Toggles hunt item checked state
  - ✗ Toggles different hunt items independently
  - ✗ Doesn't mutate other items when toggling one
  - ✗ Persists hunt item toggle to localStorage

- **Hunt completion state** — 3 tests
  - ✗ Sets `gameState: "hunt-complete"` when all items checked
  - ✗ Doesn't set hunt-complete until all items checked
  - ✗ Exposes hunt completion status

- **Hunt state persistence** — 3 tests
  - ✗ Persists hunt state to localStorage with correct version
  - ✗ Restores hunt state from localStorage on mount
  - ✗ Validates hunt items in stored data

- **resetGame with hunt mode** — 3 tests
  - ✗ Resets hunt progress and returns to start
  - ✗ Clears all hunt item checks on reset
  - ✗ Resets hunt state in localStorage

- **Hunt vs Bingo mode isolation** — 4 tests
  - ✗ Doesn't interfere with bingo board when in hunt mode
  - ✗ Doesn't interfere with hunt items when in bingo mode
  - ✗ Switches from hunt to bingo mode
  - ✗ Switches from bingo to hunt mode

---

### 4. `src/types/index.ts` — EXTENDED ✅
**Status**: Successfully updated
**Changes**:
- ✅ Added `HuntItem` interface:
  ```typescript
  export interface HuntItem {
    id: number;
    text: string;
    isChecked: boolean;
  }
  ```
- ✅ Extended `GameState` type to include hunt modes:
  ```typescript
  export type GameState =
    | 'start'
    | 'playing'
    | 'bingo'
    | 'hunt'
    | 'hunt-playing'
    | 'hunt-complete';
  ```

---

## Test Statistics

| File | Tests | Status |
|------|-------|--------|
| `huntLogic.test.ts` | 27 | ❌ All Fail |
| `HuntScreen.test.tsx` | 15 | ❌ All Fail |
| `useBingoGame.test.ts` | 32 | ❌ All Fail |
| **TOTAL** | **74** | **❌ 74 Failing** |

---

## Expected Failures

### Why All Tests Fail:

1. **`src/utils/huntLogic.ts`** doesn't exist yet
   - Tests expect: `generateHuntItems()`, `toggleHuntItem()`, `calculateHuntProgress()`, `checkHuntComplete()`

2. **`src/components/HuntScreen.tsx`** doesn't exist yet
   - Tests expect: Component accepting `huntItems`, `onItemToggle`, `onBack` props

3. **`src/hooks/useBingoGame.ts`** doesn't support hunt mode yet
   - Tests expect: `huntItems`, `huntComplete` state properties
   - Tests expect: `startGame("hunt")`, `handleHuntItemToggle(itemId)` actions
   - Tests expect: Hunt mode game states: 'hunt', 'hunt-playing', 'hunt-complete'

4. **`src/types/index.ts`** — UPDATED ✅
   - Now includes `HuntItem` type and extended `GameState`
   - Types are ready for implementation

---

## Implementation Checklist (for next phase)

- [ ] Implement `src/utils/huntLogic.ts` with all 4 functions
- [ ] Implement `src/components/HuntScreen.tsx` component
- [ ] Extend `src/hooks/useBingoGame.ts` to support hunt mode
- [ ] Run all tests: `npm test` (expect 74 passing)
- [ ] Run linter: `npm run lint`
- [ ] Build: `npm run build`

---

## Key Design Decisions in Tests

### Immutability First
- All `toggleHuntItem()` tests verify new array creation
- Tests check that original arrays and objects are never mutated
- Follows existing bingo logic patterns

### localStorage Versioning
- Tests verify hunt state persists with STORAGE_VERSION
- Restoration tests ensure data integrity on reload
- Validation tests check structure matches schema

### Mode Isolation
- Tests ensure hunt mode doesn't interfere with bingo board
- Tests verify mode switching works bidirectionally
- No cross-contamination of state

### Progress Tracking
- calculateHuntProgress() returns simple count (0-24)
- checkHuntComplete() is boolean (used for state transitions)
- Progress meter tests verify UI reflects current state

### Scrollable Checklist
- HuntScreen renders all 24 items (not paginated)
- Checkbox pattern matches Testing Library best practices
- Progress shows "X/24" format for clarity

---

## Testing Patterns Used

**Consistent with existing codebase:**
- Import style: `import { describe, it, expect } from 'vitest'`
- Component testing: `render()`, `screen`, `fireEvent` from `@testing-library/react`
- Hook testing: `renderHook()`, `act()` wrapper for state updates
- Mock localStorage following project conventions
- Full TypeScript typing for all test functions

---

Generated: TDD RED Phase
Ready for: Implementation Phase (GREEN)
