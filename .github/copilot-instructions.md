# Copilot Instructions for Social Bingo

## Mandatory Development Checklist
Before committing changes, always run:
- [ ] `npm run lint` - ESLint with React Hooks rules (flat config)
- [ ] `npm run build` - TypeScript compilation + Vite build
- [ ] `npm test` - Vitest unit tests (jsdom + Testing Library)

## Architecture
React 19 + TypeScript + Vite + Tailwind v4. 5x5 bingo grid for in-person mixers.

**State Flow**: `useBingoGame` hook → localStorage persistence (versioned) → pure functions in `bingoLogic.ts`
**Component Tree**: `App` → `StartScreen | (GameScreen + BingoModal)` → `BingoBoard` → `BingoSquare`

### Critical Patterns
- **Immutable updates**: Always return new arrays/objects (`board.map(...)` not `.push()`)
- **Pure logic**: All game rules in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) - fully unit tested
- **localStorage**: Auto-save with `validateStoredData()` + `STORAGE_VERSION` for migrations

### Code Organization
```
src/
├── types/         # Domain models (BingoSquareData, GameState)
├── data/          # questions.ts - content array
├── utils/         # bingoLogic.ts + tests (pure functions)
├── hooks/         # useBingoGame.ts (state + persistence)
└── components/    # UI (presentational only)
```

## Key Conventions
- **5x5 grid**: Center index 12 is FREE_SPACE (always marked)
- **Win detection**: `checkBingo()` checks all rows, columns, diagonals
- **Tailwind v4**: Uses `@tailwindcss/vite` plugin (not PostCSS)
- **No PropTypes**: TypeScript interfaces only (React 19)

## Quick Tasks
**Edit questions**: Modify array in [src/data/questions.ts](src/data/questions.ts)
**Change win conditions**: Update `getWinningLines()` in [bingoLogic.ts](src/utils/bingoLogic.ts)
**Break saves**: Increment `STORAGE_VERSION` in [useBingoGame.ts](src/hooks/useBingoGame.ts)

## Deployment
GitHub Pages auto-deploys on `main` push. Base path auto-detected via `VITE_REPO_NAME` env var.

## Design Guide: Retro Terminal Green

The app uses a **1980s-90s green terminal aesthetic** with neon glows and monospace fonts.

### Color Palette
All colors defined in [src/index.css](src/index.css) via `@theme`:
- **Accent (Neon Green)**: `#0FFF50` - primary interactive color, text, borders, glow effects
- **Accent Light**: `#39FF14` - enhanced neon for active states
- **Background (Dark)**: `#0a0e27` (body) + `#111827` (gray-900) - terminal window color
- **Text**: Neon green with `text-shadow: 0 0 10px rgba(15, 255, 80, 0.5)` for CRT glow

### Typography & Effects
- **Font**: Monospace (Courier New) for authentic terminal feel
- **Text Rendering**: All text includes subtle green glow via `text-shadow`
- **Borders**: Sharp edges (no `rounded-*`), `border-2` weight for visibility
- **Interactive States**: Glow shadows on active: `shadow-[0_0_15px_rgba(15,255,80,0.8)]`

### Component Styling Reference

**BingoSquare States**:
- Unmarked: `bg-gray-900 border-accent` - dark with green border
- Marked: `bg-accent border-accent text-gray-900 shadow-[0_0_10px_...]` - bright green with glow
- Winning: Same as marked, stronger glow: `shadow-[0_0_15px_...]` for emphasis

**Buttons**:
- Style: `bg-accent text-gray-900 border-2 border-accent` - green background, dark text
- Glow: `shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]`
- Text: Bracket notation (`[ TEXT ]`) for terminal authenticity

**Modals & Cards**:
- Background: `bg-gray-900 border-2 border-accent`
- Shadow: `shadow-2xl shadow-accent/50` for depth with green glow

### Maintaining the Aesthetic
When adding new UI:
1. Use `bg-gray-900` for backgrounds, `bg-accent` for interactive elements
2. Always add `border-accent` on cards/containers with `border-2`
3. Add glow shadows: `shadow-[0_0_Xpx_rgba(15,255,80,Y)]` where X=8-20px, Y=0.4-0.8
4. Use monospace font via CSS inheritance (set globally in body)
5. Remove `rounded-*` utilities; prefer sharp edges for retro feel
6. Terminal conventions: `>` prefix for instructions, brackets for labels (`[ TEXT ]`)
