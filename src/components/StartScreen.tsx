interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-900">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl font-bold text-accent mb-2 font-mono">Soc Ops</h1>
        <p className="text-lg text-accent mb-8 font-mono">[ SOCIAL BINGO ]</p>
        
        <div className="bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50 mb-8">
          <h2 className="font-semibold text-accent mb-3 font-mono border-b-2 border-accent pb-2">&gt; HOW TO PLAY</h2>
          <ul className="text-left text-accent text-sm space-y-2 font-mono">
            <li>&gt; Find people who match the questions</li>
            <li>&gt; Tap a square when you find a match</li>
            <li>&gt; Get 5 in a row to WIN!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent text-gray-900 font-semibold py-4 px-8 text-lg active:bg-accent-light transition-colors font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]"
        >
          [ START GAME ]
        </button>
      </div>
    </div>
  );
}
