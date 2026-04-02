import { coffee } from '@functions';
import { getSideToMove } from '@functions/chess';
import { badMove, replyMove, wasSolved } from '@functions/chess/puzzle';
import { toaster } from '@lib';
import { NextChessground } from 'next-chessground';
import { useEffect, useMemo, useRef, useState } from 'react';
import FeedbackIcon from './FeedbackIcon';

const Puzzle = ({ fen, moves, setHistory }) => {
  const ref = useRef();

  const [viewOnly, setViewOnly] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [feedbackMove, setFeedbackMove] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isUndo, setIsUndo] = useState(false);

  // Current FEN state, updated by NextChessground
  const [currentFen, setCurrentFen] = useState(fen);

  // Ensure currentFen stays in sync with the prop fen when it changes
  useEffect(() => {
    setCurrentFen(fen);
  }, [fen]);

  // Calculate firstTurn from the initial FEN
  const firstTurn = useMemo(() => getSideToMove(fen), [fen]);

  const verifyMove = async (chess) => {
    setHistory(chess.history());
    setIsUndo(false);
    setFeedback(null);

    const playerTurn = fen.split(' ')[1]; // 'w' or 'b'
    const history = chess.history({ verbose: true });
    const move = history[history.length - 1]; // most recent move

    // Safety check: ensure move exists before accessing its properties
    if (!move) {
      return;
    }

    const isPlayerMove = move.color === playerTurn;

    if (!chess.isGameOver()) {
      if (badMove(chess, moves)) {
        if (isPlayerMove) {
          setFeedback('error');
          setFeedbackMove({ to: move.to });
        }

        setIsUndo(true);
        await coffee(1000);

        // Clear feedback immediately before undoing
        setFeedback(null);
        setFeedbackMove(null);

        ref?.current?.undo();
      } else {
        if (isPlayerMove) {
          setFeedback('success');
          setFeedbackMove({ to: move.to });
        }
        setLastMove([move.from, move.to]);
      }

      if (wasSolved(chess, moves)) {
        setViewOnly(true);
        toaster.success('Training completed for this line');
      }
    } else {
      setViewOnly(true);
    }

    await handleReply(chess);
  };

  const handleReply = async (chess) => {
    if (chess.turn() !== fen.split(' ')[1]) {
      await coffee(1000);

      // Clear feedback when computer move starts
      setFeedback(null);
      setFeedbackMove(null);

      const nextMove = replyMove(chess, moves);

      try {
        const moveToPlay = typeof nextMove === 'string' ? nextMove : nextMove.san || nextMove.move;
        const move = chess.move(moveToPlay);

        if (move && ref?.current?.board) {
          const newFen = chess.fen();
          ref.current.board.set({ fen: newFen });
          setCurrentFen(newFen);
          setLastMove([move.from, move.to]);
          // Update history to include computer's move
          setHistory(chess.history());
          // Small delay to ensure the move is registered
          await coffee(20);
        }
      } catch (error) {
        console.warn('Invalid reply move:', nextMove, error);
      }
    }
  };

  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => {
        setFeedback(null);
        setFeedbackMove(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  return (
    <div className="relative w-full max-w-chess-board">
      <NextChessground
        ref={ref}
        fen={currentFen}
        lastMove={lastMove}
        viewOnly={viewOnly}
        onMove={verifyMove}
        onFenChange={setCurrentFen}
        drawable={false}
        isUndo={isUndo}
      />
      <FeedbackIcon feedback={feedback} lastMove={feedbackMove} firstTurn={firstTurn} />
    </div>
  );
};

export default Puzzle;
