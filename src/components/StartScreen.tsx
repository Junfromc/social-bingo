interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="text-center max-w-2xl w-full">
        {/* ASCII Art Title Banner */}
        <pre className="text-accent text-xs sm:text-sm md:text-base lg:text-lg leading-none mb-8" aria-label="SOC OPS title in ASCII art format">
{`
 ███████╗ ██████╗  ██████╗    ██████╗ ██████╗ ███████╗
 ██╔════╝██╔═══██╗██╔════╝   ██╔═══██╗██╔══██╗██╔════╝
 ███████╗██║   ██║██║        ██║   ██║██████╔╝███████╗
 ╚════██║██║   ██║██║        ██║   ██║██╔═══╝ ╚════██║
 ███████║╚██████╔╝╚██████╗   ╚██████╔╝██║     ███████║
 ╚══════╝ ╚═════╝  ╚═════╝    ╚═════╝ ╚═╝     ╚══════╝
`}
        </pre>
        
        {/* Blinking Cursor */}
        <div className="text-accent text-xl sm:text-2xl mb-12 flex items-center justify-center">
          <span>[ SOCIAL BINGO ]</span>
          <span className="inline-block w-3 h-5 bg-accent ml-2 animate-blink" aria-hidden="true"></span>
        </div>

        {/* Rules Section - Terminal Style */}
        <div className="border-2 border-accent p-4 shadow-lg shadow-accent/50 mb-12 text-left max-w-md mx-auto">
          <div className="text-accent text-sm sm:text-base space-y-2">
            <div>&gt; Find people matching the prompts</div>
            <div>&gt; Tap squares when you find a match</div>
            <div>&gt; Get 5 in a row to WIN</div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="bg-accent text-gray-900 font-semibold py-4 px-12 text-xl border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)] active:bg-accent-light transition-all"
        >
          [ START GAME ]
        </button>
      </div>
    </div>
  );
}
