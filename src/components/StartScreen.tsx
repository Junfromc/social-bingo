import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

// Helper function to get a sample of questions for the preview grid
function getSampleQuestions(): string[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const samples = shuffled.slice(0, 24);
  // Insert FREE SPACE at position 12 (center of 5x5 grid)
  samples.splice(12, 0, 'FREE SPACE');
  return samples;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const sampleGrid = getSampleQuestions();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-full p-6 bg-gray-900 overflow-auto">
      {/* Scanlines effect */}
      <div className="scanlines" />
      
      {/* Main content with higher z-index */}
      <div className="relative z-10 text-center max-w-3xl w-full">
        {/* ASCII Art Title */}
        <div className="mb-8 mt-4">
          <pre className="text-accent text-lg md:text-2xl leading-tight font-mono whitespace-pre" aria-label="Social Bingo Title">
{`╔═══════════════════════════════════════╗
║   ███████  ██████   ██████            ║
║   ██      ██    ██ ██                 ║
║   ███████ ██    ██ ██                 ║
║        ██ ██    ██ ██                 ║
║   ███████  ██████   ██████            ║
║                                       ║
║    ██████  ██████  ███████            ║
║   ██    ██ ██   ██ ██                 ║
║   ██    ██ ██████  ███████            ║
║   ██    ██ ██      ██                 ║
║    ██████  ██      ███████            ║
╚═══════════════════════════════════════╝`}
          </pre>
          <div className="text-2xl md:text-3xl font-bold text-accent mt-4 font-mono">
            SOCIAL BINGO<span className="cursor-blink">█</span>
          </div>
        </div>

        {/* What is Social Bingo section */}
        <div className="bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50 mb-6">
          <h2 className="text-xl font-bold text-accent mb-3 font-mono border-b-2 border-accent pb-2">
            &gt; WHAT IS SOCIAL BINGO?
          </h2>
          <p className="text-left text-accent text-sm md:text-base font-mono leading-relaxed">
            Social Bingo is an interactive icebreaker game designed for mixers and social events. 
            Walk around, meet new people, and find matches for each square on your bingo card. 
            The first to complete 5 in a row wins!
          </p>
        </div>

        {/* Rules section */}
        <div className="bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50 mb-6">
          <h2 className="text-xl font-bold text-accent mb-4 font-mono border-b-2 border-accent pb-2">
            &gt; HOW TO PLAY
          </h2>
          <ol className="text-left text-accent text-sm md:text-base space-y-2 font-mono">
            <li>&gt; Step 1: Read the question in each square</li>
            <li>&gt; Step 2: Find people who match the questions</li>
            <li>&gt; Step 3: Tap a square when you find a match</li>
            <li>&gt; Step 4: Complete 5 in a row (horizontal, vertical, or diagonal)</li>
            <li>&gt; Step 5: Celebrate your BINGO!</li>
          </ol>
        </div>

        {/* Sample grid preview */}
        <div className="bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50 mb-8">
          <h2 className="text-xl font-bold text-accent mb-4 font-mono border-b-2 border-accent pb-2">
            &gt; PREVIEW: YOUR BINGO CARD
          </h2>
          <div className="grid grid-cols-5 gap-1 max-w-xl mx-auto">
            {sampleGrid.map((question, index) => (
              <div
                key={index}
                className={`
                  relative flex items-center justify-center p-1 text-center border-2 
                  min-h-[50px] text-[10px] md:text-xs leading-tight font-mono
                  ${index === 12 
                    ? 'bg-accent border-accent text-gray-900 font-bold shadow-[0_0_10px_rgba(15,255,80,0.6)]' 
                    : 'bg-gray-900 border-accent text-accent'
                  }
                `}
              >
                <span className="break-words hyphens-auto px-0.5">
                  {question}
                </span>
              </div>
            ))}
          </div>
          <p className="text-accent text-xs md:text-sm font-mono mt-4 opacity-80">
            ^ Each game generates a unique randomized card ^
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full max-w-md mx-auto bg-accent text-gray-900 font-semibold py-4 px-8 text-lg md:text-xl active:bg-accent-light transition-colors font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)] block"
        >
          [ START GAME ]
        </button>

        {/* Terminal prompt at bottom */}
        <div className="text-accent text-xs md:text-sm font-mono mt-8 mb-4 opacity-60">
          &gt; Press START to initialize game_
        </div>
      </div>
    </div>
  );
}
