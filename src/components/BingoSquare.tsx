import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-1 text-center border-2 transition-all duration-150 select-none min-h-[60px] text-xs leading-tight font-mono';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-accent border-accent text-gray-900 shadow-[0_0_15px_rgba(15,255,80,0.8)]'
      : 'bg-accent border-accent text-gray-900 shadow-[0_0_10px_rgba(15,255,80,0.6)]'
    : 'bg-gray-900 border-accent text-accent active:shadow-[0_0_8px_rgba(15,255,80,0.4)]';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-accent text-xs font-bold">✓</span>
      )}
    </button>
  );
}
