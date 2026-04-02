import { round } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useDrillStats = () => {
  const [wrongMoves, setWrongMoves] = useState([]);

  const [totalMoves, setTotalMoves] = useState(0);
  const [retryMistakes, setRetryMistakes] = useState(0);
  const [goodMoves, setGoodMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Count current retries
  const [retryCount, setRetryCount] = useState(0);

  // Computed statistics
  const accuracy = useMemo(() => {
    return Math.max(0, round(((totalMoves - mistakes - retryMistakes) / totalMoves) * 100)) || 0;
  }, [totalMoves, mistakes, retryMistakes]);

  // Stats object to be used in the context
  const stats = {
    wrongMoves,
    totalMoves,
    goodMoves,
    accuracy,
    mistakes,
    retryMistakes,
    retryCount,
  };

  // Function to add a user move
  const addUserMove = useCallback((history, currentFen, isGoodMove, mode) => {
    // Increment total moves for every user move
    setTotalMoves((prev) => Math.max(0, prev + 1));

    const userMoment = {
      move: history[history.length - 1],
      fen: currentFen,
    };

    if (!isGoodMove) {
      // Add wrong move with the current FEN only if not already present
      setWrongMoves((prev) => {
        const isAlreadyWrong = prev.some((move) => move.fen === currentFen);
        if (!isAlreadyWrong) {
          return [...prev, userMoment];
        }
        return prev;
      });

      // Increment mistakes when not in retry mode
      if (mode !== 'retry') {
        setMistakes((prev) => prev + 1);
      }

      // Increment retry mistakes if in retry mode
      if (mode === 'retry') {
        setRetryMistakes((prev) => prev + 1);
        setRetryCount((prev) => prev + 1);
      }
    } else {
      // Increment good moves for correct moves
      setGoodMoves((prev) => prev + 1);

      if (mode === 'retry') {
        // Remove wrong move with the current FEN
        setWrongMoves((prev) => prev.filter((move) => move.fen !== currentFen));
        setRetryCount(0);
      }
    }
  }, []);

  // Reset stats when URL fragment index changes
  const router = useRouter();
  const index = Number(router.asPath.split('#')[1]) || 0;
  useEffect(() => {
    setWrongMoves([]);
    setTotalMoves(0);
    setRetryMistakes(0);
    setGoodMoves(0);
    setMistakes(0);
  }, [index]);

  return {
    stats,
    addUserMove,
  };
};

export default useDrillStats;
