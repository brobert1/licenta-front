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
  boardRef,
  viewOnly = false,
  resumeHistory = null,
}) => {
  const ref = useRef();
  const isEngineMoving = useRef(false);
  const hasMovedFirst = useRef(false);
  const moveGeneration = useRef(0);
  const viewOnlyRef = useRef(viewOnly);
  // Resume replay guards
  const isReplayingRef = useRef(false);
  const hasResumedRef = useRef(false);
  const { saveHistory } = useChessContext();

  // Keep viewOnlyRef in sync and stop the engine immediately when the game ends
  useEffect(() => {
    viewOnlyRef.current = viewOnly;
    if (viewOnly && engine) {
      moveGeneration.current += 1;
      engine.stop();
    }
  }, [viewOnly]);

  // Set custom starting position if specified
  useEffect(() => {
    if (engine && engine.isReady) {
      engine.set_position(fen);
    }
  }, [engine, fen]);

  // Make the engine move on the chess board
  const makeEngineMove = async (fen) => {
    if (!engine || !ref.current) return false;

    const generation = moveGeneration.current;
    const botColor = playerColor === 'white' ? 'black' : 'white';
    const bookMove = getBookMove(botColor, openingLine, fen);
    let nextMove;

    if (bookMove) {
      // Use the book move (but still add thinking delay for realism)
      await coffee(thinkTime);
      nextMove = bookMove;
    } else {
      await engine.set_position(fen);
      let bestMoveResult;
      const startTime = Date.now();

      // Use time-aware engine moves if in timed game mode
      if (timeControl && botTime > 0) {
        const playerTimeMs = playerTime * 1000;
        const botTimeMs = botTime * 1000;
        const incrementMs = (timeControl.increment || 0) * 1000;

        const timeOptions =
          playerColor === 'white'
            ? { wtime: playerTimeMs, btime: botTimeMs, winc: incrementMs, binc: incrementMs }
            : { wtime: botTimeMs, btime: playerTimeMs, winc: incrementMs, binc: incrementMs };

        bestMoveResult = await engine.go(timeOptions);
      } else {
        bestMoveResult = await engine.go_time(thinkTime);
      }

      // Handle timeout or failed engine response
      if (!bestMoveResult) return false;

      // Artificial thinking delay so the bot doesn't move instantly
      const elapsed = Date.now() - startTime;
      const minDelay = timeControl ? 1000 : thinkTime;
      const remaining = Math.max(0, minDelay - elapsed);
      if (remaining > 0) await coffee(remaining);

      nextMove = engineMove(bestMoveResult);
    }

    // Abort if a takeback happened or the game ended while engine was thinking
    if (moveGeneration.current !== generation) return false;
    if (viewOnlyRef.current) return false;

    if (nextMove && isFunction(ref?.current?.move)) {
      isEngineMoving.current = true;
      const moveResult = ref.current.move(nextMove.from, nextMove.to, nextMove.promotion);

      return moveResult !== false;
    }

    return false;
  };

  // Handles both user moves and engine moves
  const handleMove = async (chess) => {
    if (viewOnlyRef.current) return;
    // Skip all logic during silent history replay on resume
    if (isReplayingRef.current) return;

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
      return engine.stop();
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

  if (boardRef) {
    boardRef.current = {
      takeback: () => {
        if (!ref.current) return false;

        // Increment generation to cancel any pending engine move
        moveGeneration.current += 1;
        engine.stop();

        const chess = ref.current.chess;
        const history = chess.history({ verbose: true });
        if (history.length < 1) return false;

        const currentTurn = chess.turn();
        const playerTurnChar = playerColor === 'white' ? 'w' : 'b';
        const isBotTurn = currentTurn !== playerTurnChar;

        let undoneCount;

        if (isBotTurn) {
          // Bot is thinking — only undo the user's last move
          ref.current.undo();
          undoneCount = 1;
        } else {
          // User's turn — undo both the bot's last move and the user's move before it
          if (history.length < 2) return false;
          ref.current.undo();
          ref.current.undo();
          undoneCount = 2;
        }

        // Restore engine turn state (odd undo count means one unmatched toggle)
        if (undoneCount % 2 === 1) {
          engine.toggleTurn();
        }

        // Sync engine and context
        saveHistory(chess);
        engine.set_position(chess.fen());

        return { count: undoneCount, history: chess.history({ verbose: true }), pgn: chess.pgn() };
      },
    };
  }

  // Silently replay saved history when resuming a game.
  // This fires once the engine is configured and the board ref is ready.
  useEffect(() => {
    if (!engine?.isReady || !resumeHistory?.length || hasResumedRef.current || !ref.current) return;

    hasResumedRef.current = true;
    // Prevent the initial-move effect from also firing after replay
    hasMovedFirst.current = true;

    isReplayingRef.current = true;
    for (const move of resumeHistory) {
      ref.current.move(move.from, move.to, move.promotion || undefined);
    }
    isReplayingRef.current = false;

    // Sync ChessContext and engine position with the replayed final state
    const chess = ref.current.chess;
    saveHistory(chess);
    engine.set_position(chess.fen());

    // If the bot should move next (game was interrupted on the bot's turn), trigger it
    const botColorChar = playerColor === 'white' ? 'b' : 'w';
    if (chess.turn() === botColorChar && !chess.isGameOver()) {
      engine.toggleTurn();
      makeEngineMove(chess.fen());
    }
  }, [engine, engine?.isReady, resumeHistory]);

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
      premoves={!viewOnly}
      ref={ref}
      fen={fen}
      orientation={orientation}
      onMove={handleMove}
      viewOnly={viewOnly}
    />
  );
};

export default ChessBoard;
