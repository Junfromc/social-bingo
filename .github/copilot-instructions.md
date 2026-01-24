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
