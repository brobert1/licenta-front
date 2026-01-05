import { useChessContext } from '@chess/contexts';
import { engineMove } from '@chess/functions';
import { getBookMove } from '@chess/functions/opening-book';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useEffect, useRef } from 'react';

const ChessBoard = ({
  fen,
  orientation,
  engine,
  thinkTime,
  onGameOver,
  playerColor,
  onMove,
  openingLine,
  timeControl = null,
  playerTime = 0,
  botTime = 0,
}) => {
  const ref = useRef();
  const isEngineMoving = useRef(false);
  const hasMovedFirst = useRef(false);
  const { saveHistory } = useChessContext();

  // Set custom starting position if specified
  useEffect(() => {
    if (engine && engine.isReady) {
      engine.set_position(fen);
    }
  }, [engine, fen]);

  // Make the engine move on the chess board
  const makeEngineMove = async (fen) => {
    if (!engine || !ref.current) return false;

    const botColor = playerColor === 'white' ? 'black' : 'white';
    const bookMove = getBookMove(botColor, openingLine, fen);
    let nextMove;

    if (bookMove) {
      // Use the book move (but still add thinking delay for realism)
      await coffee(thinkTime);
      nextMove = bookMove;
    } else {
      await engine.set_position(fen);
      // Use time-aware engine moves if in timed game mode
      if (timeControl && botTime > 0) {
        // Convert seconds to milliseconds for UCI protocol
        const playerTimeMs = playerTime * 1000;
        const botTimeMs = botTime * 1000;
        const incrementMs = (timeControl.increment || 0) * 1000;

        const timeOptions =
          playerColor === 'white'
            ? { wtime: playerTimeMs, btime: botTimeMs, winc: incrementMs, binc: incrementMs }
            : { wtime: botTimeMs, btime: playerTimeMs, winc: incrementMs, binc: incrementMs };

        const bestMoveResult = await engine.go(timeOptions);
        nextMove = engineMove(bestMoveResult);
      } else {
        nextMove = engineMove(await engine.go_time(thinkTime));
      }
    }

    if (nextMove && isFunction(ref?.current?.move)) {
      isEngineMoving.current = true;
      const moveResult = ref.current.move(nextMove.from, nextMove.to, nextMove.promotion);

      return moveResult !== false;
    }

    return false;
  };

  // Handles both user moves and engine moves
  const handleMove = async (chess) => {
    const wasEngineMoveCallback = isEngineMoving.current;

    if (wasEngineMoveCallback) {
      isEngineMoving.current = false;
    }

    engine.toggleTurn();
    saveHistory(chess);

    if (onMove && isFunction(onMove)) {
      onMove(chess);
    }

    if (chess.isGameOver()) {
      await onGameOver(chess);
      return engine.quit();
    }

    if (wasEngineMoveCallback) {
      return;
    }

    if (engine.turn) {
      await makeEngineMove(chess.fen());
    }

    // Execute premove if available
    if (ref.current && ref.current.playPremove) {
      await coffee(100);
      await ref.current.playPremove();
    }
  };

  // Handle initial engine move if engine should start first
  useEffect(() => {
    const handleInitialMove = async () => {
      if (
        engine &&
        engine.isReady &&
        !hasMovedFirst.current &&
        engine.shouldMoveFirst(fen, playerColor)
      ) {
        hasMovedFirst.current = true;
        engine.toggleTurn();
        await makeEngineMove(fen);
      }
    };

    handleInitialMove();
  }, [engine, engine?.isReady, fen, playerColor]);

  return (
    <NextChessground
      premoves={true}
      ref={ref}
      fen={fen}
      orientation={orientation}
      onMove={handleMove}
    />
  );
};

export default ChessBoard;
