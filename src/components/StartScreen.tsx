import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-900">
      <div className="text-center max-w-md w-full">
        {/* Title with static glitch effect */}
        <h1 
          className="text-6xl font-bold text-accent mb-4 font-mono"
          style={{
            textShadow: `
              0 0 10px rgba(15, 255, 80, 0.5),
              2px 2px 0px rgba(15, 255, 80, 0.3),
              -2px -2px 0px rgba(15, 255, 80, 0.3),
              2px -2px 0px rgba(15, 255, 80, 0.2),
              -2px 2px 0px rgba(15, 255, 80, 0.2)
            `
          }}
        >
          Soc Ops
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-accent mb-12 font-mono">[ SOCIAL BINGO ]</p>
        
        {/* Prominent START button */}
        <button
          onClick={onStart}
          className="w-full bg-accent text-gray-900 font-bold py-6 px-8 text-2xl mb-6 active:bg-accent-light transition-colors font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]"
        >
          [ START GAME ]
        </button>

        {/* Collapsible help section */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-accent text-sm font-mono hover:text-accent-light transition-colors mb-4"
        >
          {showHelp ? '[ HIDE HELP ]' : '[ HOW TO PLAY? ]'}
        </button>

        {showHelp && (
          <div className="bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50">
            <ul className="text-left text-accent text-sm space-y-2 font-mono">
              <li>&gt; Find people who match the questions</li>
              <li>&gt; Tap a square when you find a match</li>
              <li>&gt; Get 5 in a row to WIN!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
