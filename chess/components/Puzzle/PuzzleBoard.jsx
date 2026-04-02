import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { badMove, getNextMoment, parseFen, replyMove, wasSolved } from '@chess/functions';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useMemo, useRef, useState } from 'react';

const isSquare = (value) => typeof value === 'string' && /^[a-h][1-8]$/.test(value);

const cleanShapes = (items = []) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((shape) => {
    if (!isSquare(shape?.orig)) {
      return false;
    }

    if (shape?.dest && !isSquare(shape.dest)) {
      return false;
    }

    return true;
  });
};

const PuzzleBoard = ({ fen, moves, onComplete }) => {
  const ref = useRef();

  const { currentFen, initialTurn, saveHistory, isUserTurn } = useChessContext();
  const [viewOnly, setViewOnly] = useState(false);
  const { mode, shapes, solution } = usePuzzleContext();

  const isHintTurn = useMemo(() => {
    return parseFen(currentFen)?.activeColor === initialTurn;
  }, [currentFen, initialTurn]);

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

    if (!isSquare(nextMove?.from) || !isSquare(nextMove?.to) || !ref?.current?.board) {
      return;
    }

    try {
      const moveToPlay = nextMove.move || nextMove.san || nextMove;
      const playedMove =
        typeof moveToPlay === 'string'
          ? chess.move(moveToPlay)
          : chess.move({
              from: nextMove.from,
              to: nextMove.to,
              promotion: nextMove.promotion,
            });

      if (!playedMove) {
        return;
      }

      ref.current.board.set({ fen: chess.fen() });
      saveHistory(chess);
    } catch {
      return;
    }
  };

  // Hint/solution shapes - computed locally to prevent flickering
  const hintShapes = useMemo(() => {
    if (mode === 'nohint' || !isHintTurn || !solution || !currentFen) {
      return [];
    }
    const nextMoment = getNextMoment(solution, currentFen);
    if (!isSquare(nextMoment?.from)) return [];

    if (mode === 'hint') {
      return [{ orig: nextMoment.from, brush: 'blue' }];
    }
    if (mode === 'solution' && isSquare(nextMoment?.to)) {
      return [{ orig: nextMoment.from, dest: nextMoment.to, brush: 'green' }];
    }
    return [];
  }, [mode, isHintTurn, solution, currentFen]);

  const boardShapes = useMemo(() => cleanShapes(shapes), [shapes]);

  // Drawable config with autoShapes for hint/solution visualization
  const drawable = { enabled: false, visible: true, autoShapes: hintShapes };

  return (
    <NextChessground
      ref={ref}
      fen={fen}
      viewOnly={viewOnly}
      onMove={handleMove}
      drawable={drawable}
      shapes={boardShapes}
    />
  );
};

export default PuzzleBoard;
