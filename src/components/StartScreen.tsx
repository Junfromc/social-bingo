import { useState } from 'react';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

// Constants for 5x5 grid layout
const GRID_ITEMS_BEFORE_CENTER = 12; // First half of grid before center (0-11)
const GRID_ITEMS_AFTER_CENTER = 12;  // Second half of grid after center (13-24)

export function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);
  
  // Sample 5x5 grid for preview (using first 24 questions + free space)
  const previewGrid = questions.slice(0, 24);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-8 bg-gray-900 overflow-y-auto">
      <div className="max-w-6xl w-full">
        {/* Title with glitch animation */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-accent mb-3 font-mono glitch-on-load glitch-on-hover">
            Soc Ops
          </h1>
          <p className="text-xl md:text-2xl text-accent mb-4 font-mono">[ SOCIAL BINGO ]</p>
          <p className="text-base md:text-lg text-accent/80 font-mono max-w-2xl mx-auto">
            &gt; Find people who match your traits
          </p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* How to Play Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-accent mb-4 font-mono border-b-2 border-accent pb-2">
              &gt; How to Play
            </h2>
            
            <div className="space-y-4">
              {/* Interactive Rule Cards */}
              <div className="bg-gray-900 border-2 border-accent p-4 rule-card-hover cursor-default">
                <h3 className="text-accent font-bold mb-2 font-mono">1. MINGLE &amp; MATCH</h3>
                <p className="text-accent/80 text-sm font-mono">
                  Walk around and find people who match the traits on your bingo board
                </p>
              </div>

              <div className="bg-gray-900 border-2 border-accent p-4 rule-card-hover cursor-default">
                <h3 className="text-accent font-bold mb-2 font-mono">2. TAP TO MARK</h3>
                <p className="text-accent/80 text-sm font-mono">
                  When you find a match, tap the square to mark it green
                </p>
              </div>

              <div className="bg-gray-900 border-2 border-accent p-4 rule-card-hover cursor-default">
                <h3 className="text-accent font-bold mb-2 font-mono">3. GET 5 IN A ROW</h3>
                <p className="text-accent/80 text-sm font-mono">
                  Complete any row, column, or diagonal to achieve BINGO and win!
                </p>
              </div>

              <div className="bg-gray-900 border-2 border-accent p-4 rule-card-hover cursor-default">
                <h3 className="text-accent font-bold mb-2 font-mono">4. CENTER IS FREE</h3>
                <p className="text-accent/80 text-sm font-mono">
                  The center square starts marked - it's your free space!
                </p>
              </div>
            </div>
          </div>

          {/* 5x5 Grid Preview */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-accent mb-4 font-mono border-b-2 border-accent pb-2">
              &gt; Sample Board
            </h2>
            <div className="bg-gray-900 border-2 border-accent p-4 shadow-lg shadow-accent/50">
              <div className="grid grid-cols-5 gap-1">
                {previewGrid.slice(0, GRID_ITEMS_BEFORE_CENTER).map((question, idx) => (
                  <div key={idx} className="preview-grid-square">
                    {question}
                  </div>
                ))}
                {/* Free space in center */}
                <div className="bg-accent border border-accent p-1 text-[8px] md:text-[10px] text-gray-900 text-center font-mono font-bold flex items-center justify-center min-h-[40px] md:min-h-[50px]">
                  FREE
                </div>
                {previewGrid.slice(GRID_ITEMS_BEFORE_CENTER, GRID_ITEMS_BEFORE_CENTER + GRID_ITEMS_AFTER_CENTER).map((question, idx) => (
                  <div key={idx + GRID_ITEMS_BEFORE_CENTER} className="preview-grid-square">
                    {question}
                  </div>
                ))}
              </div>
              <p className="text-accent/60 text-xs font-mono mt-3 text-center">
                &gt; Each board is randomized
              </p>
            </div>
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-accent text-gray-900 font-bold py-4 px-12 text-lg transition-all font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)] active:bg-accent-light"
          >
            [ QUICK START ]
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="w-full sm:w-auto bg-transparent text-accent font-bold py-4 px-12 text-lg transition-all font-mono border-2 border-accent shadow-lg shadow-accent/50 hover:shadow-[0_0_20px_rgba(15,255,80,0.8)] hover:bg-accent/10"
          >
            [ SEE RULES ]
          </button>
        </div>

        {/* Expandable Rules Section */}
        {showRules && (
          <div className="bg-gray-900 border-2 border-accent p-6 shadow-2xl shadow-accent/50 mb-6">
            <h3 className="text-xl font-bold text-accent mb-4 font-mono border-b-2 border-accent pb-2">
              &gt; What is Social Bingo?
            </h3>
            <div className="text-accent/90 text-sm font-mono space-y-3">
              <p>
                Social Bingo is an icebreaker game designed for in-person events, mixers, and team building activities.
              </p>
              <p>
                Each player receives a unique 5x5 grid filled with different traits and characteristics. 
                Your goal is to walk around, meet new people, and find someone who matches each square on your board.
              </p>
              <p>
                When you find a match, tap the square to mark it. The first person to complete a full row, 
                column, or diagonal wins! It's a fun way to break the ice and learn interesting facts about others.
              </p>
              <p className="text-accent font-bold pt-2">
                &gt; PRO TIP: Don't forget - the center square is always FREE!
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-accent/50 text-xs font-mono">
          &gt; Made with neon &amp; love
        </div>
      </div>
    </div>
  );
}
