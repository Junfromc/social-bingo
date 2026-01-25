interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-accent p-6 max-w-xs w-full text-center shadow-2xl shadow-accent/50 animate-[bounce_0.5s_ease-out] font-mono">
        <div className="text-5xl mb-4">🎮</div>
        <h2 className="text-3xl font-bold text-accent mb-2">[ BINGO! ]</h2>
        <p className="text-accent mb-6">&gt; You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-accent text-gray-900 font-semibold py-3 px-6 active:bg-accent-light transition-colors border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]"
        >
          [ KEEP PLAYING ]
        </button>
      </div>
    </div>
  );
}
