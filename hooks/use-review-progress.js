import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';

const countHalfmoves = (pgn) => {
  if (!pgn) return 0;
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess.history().length;
};

const useReviewProgress = (isAnalyzing, pgn = null) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAnalyzing && progress > 0) {
      // Smoothly finish: step through to 100
      const steps = [95, 98, 100];
      let i = 0;
      const finishInterval = setInterval(() => {
        setProgress(steps[i]);
        i++;
        if (i >= steps.length) clearInterval(finishInterval);
      }, 200);
      return () => clearInterval(finishInterval);
    }

    if (!isAnalyzing) return;

    setProgress(0);

    // Calculate expected duration based on halfmoves
    const halfmoves = countHalfmoves(pgn);
    const expectedDuration = halfmoves * 0.2 * 1000;
    const startTime = Date.now();

    // Update progress based on elapsed time vs expected duration
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = (elapsed / expectedDuration) * 100;

      // Cap at 92% while analyzing (to show activity even if taking longer)
      setProgress(Math.min(calculatedProgress, 92));
    }, 100);

    return () => clearInterval(interval);
  }, [isAnalyzing, pgn]);

  return Math.min(Math.round(progress), 100);
};

export default useReviewProgress;
