import { useDrillContext } from '@contexts/DrillContext';
import { coffee } from '@functions';
import {
  checkDrillMove,
  getMomentsStats,
  getNextMoment,
  getNextShape,
  getSideToMove,
} from '@functions/chess';
import { usePreview } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChangeHintMode, FeedbackIcon, MoveArrows } from '.';

const DrillChessground = ({
  mode,
  setMode,
  pgnProps,
  isCompleted,
  handleComplete,
  showControls = true,
}) => {
  const ref = useRef();
  const { isPreview } = usePreview();

  // Drill context
  const { addUserMove, updateContext, values } = useDrillContext();

  const {
    fen,
    mainlineMoments: moments,
    current, // Current moment in the PGN
    firstTurn,
    lastMoment,
    goNextMoment,
    goPrevMoment,
    syncLastMove,
  } = pgnProps;

  // Feedback and last move logic
  const [feedback, setFeedback] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const completedOnceRef = useRef(false);
  useEffect(() => setFeedback(null), [mode]);

  // Current FEN state, updated by NextChessground
  const [currentFen, setCurrentFen] = useState(fen);

  // Ensure currentFen stays in sync with the prop fen when it changes
  useEffect(() => {
    setCurrentFen(fen);
  }, [fen]);

  // User turn logic
  const isUserTurn = useMemo(() => {
    return getSideToMove(currentFen) === firstTurn;
  }, [currentFen, firstTurn]);

  // Shapes logic
  const drillShapes = useMemo(() => {
    if (mode === 'text' || !isUserTurn) {
      return [];
    }
    const nextMoment = getNextMoment(currentFen, moments);
    return getNextShape(nextMoment, mode, values?.retryCount);
  }, [mode, moments, currentFen, isUserTurn]);

  // Shapes for the current moment
  const shapes = useMemo(() => {
    // Return empty shapes if the move has feedback
    if (feedback) {
      return [];
    }
    // If training is active, return drill shapes
    if (isUserTurn && mode !== 'text') {
      return drillShapes;
    }
    // Otherwise, return shapes from the current moment
    return current?.shapes || [];
  }, [current, drillShapes, isUserTurn, mode, feedback]);

  // Handle user move from hook and verify drill move
  const handleUserMove = async (chess) => {
    if (isUserTurn && mode !== 'text') {
      await verifyMove(chess);
    }
  };

  // Verify move logic
  const verifyMove = async (chess) => {
    const goodMove = checkDrillMove(moments, currentFen, chess.history());
    setFeedback(goodMove ? 'success' : 'error');

    // Last move logic
    const verbose = chess.history({ verbose: true });
    const lastMoveInfo = verbose[verbose.length - 1];
    setLastMove([lastMoveInfo.from, lastMoveInfo.to]);

    // Add user move to history
    addUserMove(chess.history(), currentFen, goodMove, mode);

    // Undo wrong move
    if (!goodMove) {
      await coffee(400);

      // Clear feedback immediately before undoing
      setFeedback(null);

      // Undo the move in chess.js
      const undone = chess.undo();
      if (undone && ref?.current?.board) {
        const newFen = chess.fen();
        ref.current.board.set({ fen: newFen });
        setCurrentFen(newFen);
      }
    }
    // Retry logic
    if (mode === 'retry') {
      if (typeof handleComplete === 'function') {
        await handleComplete();
      }
    }
  };

  // Handle opponent's move after user move
  useEffect(() => {
    const handleOpponentMove = async () => {
      if (mode === 'text' || mode === 'retry') {
        return;
      }
      const nextMoment = getNextMoment(currentFen, moments);
      const atEnd =
        !nextMoment?.move && (currentFen === lastMoment?.fen || current?.fen === lastMoment?.fen);
      if (atEnd) {
        if (!completedOnceRef.current) {
          completedOnceRef.current = true;
          await coffee(800);
          if (typeof handleComplete === 'function') {
            await handleComplete();
          }
        }
        return;
      }
      if (!isUserTurn && nextMoment?.move) {
        await coffee(800);
        ref?.current?.move(nextMoment.from, nextMoment.to);
        setLastMove([nextMoment.from, nextMoment.to]);
        await coffee(20);
        setFeedback(null);
      }
    };
    handleOpponentMove();
  }, [current, moments, isUserTurn, mode, lastMoment, handleComplete, currentFen]);

  useEffect(() => {
    const nextMoment = getNextMoment(currentFen, moments);
    const atEnd =
      !nextMoment?.move && (currentFen === lastMoment?.fen || current?.fen === lastMoment?.fen);
    if (!atEnd) {
      completedOnceRef.current = false;
    }
  }, [current, currentFen, moments, lastMoment, mode]);

  // Add stats in context for every move
  useEffect(() => {
    const stats = getMomentsStats(moments, currentFen, firstTurn);
    updateContext(stats);
  }, [moments, currentFen, firstTurn, updateContext]);

  // Drawable chessboard prop with shapes that do not dissapear on user interaction
  const drawable = { enabled: false, visible: true, autoShapes: shapes };

  // Sync last move on every FEN change
  useEffect(() => syncLastMove(currentFen), [currentFen]);

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <NextChessground
            ref={ref}
            fen={currentFen}
            drawable={drawable}
            lastMove={lastMove}
            orientation={firstTurn}
            viewOnly={mode === 'text'}
            onMove={handleUserMove}
            onFenChange={setCurrentFen}
          />
          {mode !== 'text' && (
            <FeedbackIcon feedback={feedback} lastMove={lastMove} firstTurn={firstTurn} />
          )}
        </div>
        {showControls && (
          <MoveArrows
            goPrevMoment={goPrevMoment}
            goNextMoment={goNextMoment}
            disabled={mode !== 'text'}
          />
        )}
      </div>
      {showControls && (
        <ChangeHintMode
          mode={mode}
          setMode={setMode}
          isCompleted={isCompleted}
          isPreview={isPreview}
        />
      )}
    </div>
  );
};

export default DrillChessground;
