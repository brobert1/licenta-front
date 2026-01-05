import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { badMove, getNextMoment, replyMove, wasSolved } from '@chess/functions';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useMemo, useRef } from 'react';

const PuzzleBoard = ({ fen, moves, onComplete }) => {
  const ref = useRef();

  const { currentFen, saveHistory, isUserTurn } = useChessContext();
  const { mode, viewOnly, setViewOnly, shapes, solution } = usePuzzleContext();

  const handleMove = async (chess) => {
    saveHistory(chess);
    await coffee(300);

    // Check if the user's move is incorrect
    const history = chess.history({ verbose: true });
    if (badMove(history, moves)) {
      await coffee(800);

      if (isFunction(ref?.current?.undo)) {
        ref.current.undo();
        return saveHistory(chess);
      }
    }

    // Check if the puzzle has been solved with this move
    if (wasSolved(history, moves)) {
      setViewOnly(true);
      if (isFunction(onComplete)) {
        return onComplete();
      }
    }

    // Check if the game ended unexpectedly
    if (chess.isGameOver()) {
      return setViewOnly(true);
    }

    if (isUserTurn) {
      await handleOpponentMove(chess);
    }
  };

  // Make the opponent's move
  const handleOpponentMove = async (chess) => {
    await coffee(800);

    const history = chess.history({ verbose: true });
    const nextMove = replyMove(history, moves);
    if (nextMove && isFunction(ref?.current?.move)) {
      ref.current.move(nextMove?.from, nextMove?.to);
      saveHistory(chess);
    }
  };

  // Hint/solution shapes - computed locally like DrillBoard to prevent flickering
  const hintShapes = useMemo(() => {
    if (mode === 'nohint' || !isUserTurn || !solution || !currentFen) {
      return [];
    }
    const nextMoment = getNextMoment(solution, currentFen);
    if (!nextMoment) return [];

    if (mode === 'hint') {
      return [{ orig: nextMoment.from, brush: 'blue' }];
    }
    if (mode === 'solution') {
      return [{ orig: nextMoment.from, dest: nextMoment.to, brush: 'green' }];
    }
    return [];
  }, [mode, isUserTurn]);

  // Drawable config with autoShapes for hint/solution visualization
  const drawable = { enabled: false, visible: true, autoShapes: hintShapes };

  return (
    <NextChessground
      ref={ref}
      fen={fen}
      viewOnly={viewOnly}
      onMove={handleMove}
      drawable={drawable}
      shapes={shapes}
    />
  );
};

export default PuzzleBoard;
