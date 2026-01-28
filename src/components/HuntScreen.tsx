import { useCallback, useMemo } from 'react';
import type { HuntItem } from '../types';
import { calculateHuntProgress, checkHuntComplete } from '../utils/huntLogic';

/**
 * Props for the HuntScreen component
 * @property huntItems - Array of hunt items to display
 * @property onItemToggle - Callback when an item is toggled
 * @property onBack - Callback when back button is clicked
 */
export interface HuntScreenProps {
  huntItems: HuntItem[];
  onItemToggle: (id: number) => void;
  onBack: () => void;
}

/**
 * Hunt Screen component for scavenger hunt mode
 * Displays a list of items to find and check off
 */
export function HuntScreen({
  huntItems,
  onItemToggle,
  onBack,
}: HuntScreenProps) {
  const progress = useMemo(
    () => calculateHuntProgress(huntItems),
    [huntItems]
  );
  const isComplete = useMemo(
    () => checkHuntComplete(huntItems),
    [huntItems]
  );

  const handleItemToggle = useCallback(
    (id: number) => onItemToggle(id),
    [onItemToggle]
  );

  const handleBack = useCallback(() => onBack(), [onBack]);

  return (
    <div className="min-h-full bg-gray-900 text-accent font-mono p-4 sm:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="px-4 py-2 border-2 border-accent bg-gray-900 text-accent hover:bg-accent hover:text-gray-900 hover:shadow-[0_0_15px_rgba(15,255,80,0.8)] transition-all"
        >
          [ BACK ]
        </button>
      </div>

      {/* Title and Instructions */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-4 font-mono">
          Scavenger Hunt
        </h1>
        <p className="text-sm sm:text-base text-accent opacity-90 mb-2 font-mono">
          Check off items as you find them
        </p>
      </div>

      {/* Progress Meter */}
      <div className="text-center mb-8">
        <div className="text-xl sm:text-2xl font-mono text-accent mb-4">
          {progress}/24 completed
        </div>
        <div className="w-full max-w-xs mx-auto h-6 border-2 border-accent bg-gray-900">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(progress / 24) * 100}%` }}
          />
        </div>
      </div>

      {/* Hunt Items List */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full mb-8">
        <div className="space-y-3">
          {huntItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 bg-gray-900 border-2 border-accent cursor-pointer hover:bg-accent/10 transition-colors"
            >
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleItemToggle(item.id)}
                className="w-5 h-5 cursor-pointer"
                aria-label={`Toggle ${item.text}`}
              />
              <span className="text-sm sm:text-base text-accent font-mono">
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center mb-6">
          <div className="bg-accent border-2 border-accent text-gray-900 p-6 text-center shadow-[0_0_15px_rgba(15,255,80,0.8)]">
            <p className="text-lg sm:text-xl font-bold font-mono">
              Hunt Complete!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
