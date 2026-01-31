import { useState } from 'react';
import { questions, FREE_SPACE } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

// Grid constants
const GRID_SIZE = 25;
const CENTER_POSITION = 12;
const SAMPLE_QUESTION_COUNT = 8;

// Generate a sample grid for preview
function generateSampleGrid(): string[] {
  // Take first 8 questions for consistent preview
  const samples = questions.slice(0, SAMPLE_QUESTION_COUNT);
  
  const grid: string[] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    if (i === CENTER_POSITION) {
      grid.push(FREE_SPACE);
    } else {
      grid.push(samples[i % samples.length]);
    }
  }
  return grid;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);
  const sampleGrid = generateSampleGrid();

  return (
    <div className="min-h-full overflow-y-auto bg-gray-900">
      <div className="flex flex-col items-center justify-center min-h-full p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <p className="text-sm sm:text-base text-accent mb-2 font-mono opacity-80">Soc Ops</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-4 font-mono">
              What is Social Bingo?
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-accent font-mono max-w-2xl mx-auto opacity-90 leading-relaxed">
              An icebreaker game for social mixers and networking events.
              <br className="hidden sm:block" />
              Find people who match the questions on your grid and complete a line to win!
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Visual Grid Preview */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <h2 className="text-lg sm:text-xl font-semibold text-accent mb-4 font-mono text-center lg:text-left">
                &gt; Your Bingo Grid
              </h2>
              <div className="bg-gray-900 border-2 border-accent p-4 shadow-lg shadow-accent/50">
                <div className="grid grid-cols-5 gap-1">
                  {sampleGrid.map((question, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 border border-accent aspect-square flex items-center justify-center p-1 text-[6px] sm:text-[8px] text-accent text-center leading-tight animate-grid-cell"
                      style={{ 
                        animationDelay: `${0.3 + (index * 0.02)}s`,
                        opacity: 0
                      }}
                    >
                      {question === FREE_SPACE ? (
                        <span className="font-bold text-[8px] sm:text-[10px]">FREE</span>
                      ) : (
                        <span className="opacity-80">{question}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Rules Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <h2 className="text-lg sm:text-xl font-semibold text-accent mb-4 font-mono text-center lg:text-left">
                &gt; How to Play
              </h2>
              <div className="space-y-4">
                {/* Rule Card 1 */}
                <div className="bg-gray-900 border-2 border-accent p-4 shadow-lg shadow-accent/50 animate-glow-reveal" style={{ animationDelay: '0.5s', opacity: 0 }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-gray-900 flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-1 font-mono">Meet People</h3>
                      <p className="text-xs sm:text-sm text-accent font-mono opacity-80">
                        Find people matching questions on your grid
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rule Card 2 */}
                <div className="bg-gray-900 border-2 border-accent p-4 shadow-lg shadow-accent/50 animate-glow-reveal" style={{ animationDelay: '0.6s', opacity: 0 }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-gray-900 flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-1 font-mono">Mark Matches</h3>
                      <p className="text-xs sm:text-sm text-accent font-mono opacity-80">
                        Check off squares as you find matches
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rule Card 3 */}
                <div className="bg-gray-900 border-2 border-accent p-4 shadow-lg shadow-accent/50 animate-glow-reveal" style={{ animationDelay: '0.7s', opacity: 0 }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-gray-900 flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-1 font-mono">Get Bingo</h3>
                      <p className="text-xs sm:text-sm text-accent font-mono opacity-80">
                        Complete a row, column, or diagonal to win
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <button
              onClick={onStart}
              className="flex-1 sm:flex-none bg-accent text-gray-900 font-semibold py-4 px-8 text-base sm:text-lg active:bg-accent-light transition-colors font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)]"
            >
              [ START GAME ]
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="flex-1 sm:flex-none bg-transparent text-accent font-semibold py-4 px-8 text-base sm:text-lg transition-colors font-mono border-2 border-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(15,255,80,0.5)]"
            >
              [ {showRules ? 'HIDE' : 'LEARN MORE'} ]
            </button>
          </div>

          {/* Extended Rules - Toggle */}
          {showRules && (
            <div className="mt-8 bg-gray-900 border-2 border-accent p-6 shadow-lg shadow-accent/50 animate-fade-in">
              <h3 className="font-semibold text-accent mb-4 font-mono text-lg border-b-2 border-accent pb-2">
                &gt; DETAILED RULES
              </h3>
              <div className="text-xs sm:text-sm text-accent font-mono space-y-3 opacity-90">
                <p>&gt; Each player gets a unique 5×5 bingo grid with different questions.</p>
                <p>&gt; Walk around and talk to people at the event.</p>
                <p>&gt; When you find someone who matches a question, tap that square to mark it.</p>
                <p>&gt; The center square is a FREE SPACE and is automatically marked.</p>
                <p>&gt; First person to complete 5 in a row (horizontal, vertical, or diagonal) wins!</p>
                <p>&gt; You can play multiple rounds - each game generates a new random grid.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
