import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { NextChessground } from 'next-chessground';
import { useRef, useCallback, useEffect, useState } from 'react';

const LiveChessBoard = () => {
  const ref = useRef();
  const { activeGame, playerColor, makeMove } = useMultiplayerContext();
  const lastProcessedFen = useRef(null);

  const fen = activeGame?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  // Determine whose turn it is from the FEN
  const getTurnFromFen = useCallback((fenString) => {
    const parts = fenString.split(' ');
    return parts[1] === 'w' ? 'white' : 'black';
  }, []);

  const currentTurn = getTurnFromFen(fen);
  const isMyTurn = currentTurn === playerColor;

  // Handle when a move is made on the board (receives chess.js instance)
  const handleMove = useCallback(
    (chess) => {
      // Get the last move from the chess history
      const history = chess.history({ verbose: true });
      const lastMove = history[history.length - 1];

      if (lastMove) {
        // Create the move object to send to server
        const move = {
          from: lastMove.from,
          to: lastMove.to,
        };
        if (lastMove.promotion) {
          move.promotion = lastMove.promotion;
        }

        // Send move to server via socket
        makeMove(move);
      }
    },
    [makeMove]
  );

  // Get the last move for highlighting
  const getLastMove = useCallback(() => {
    if (activeGame?.lastMove) {
      return [activeGame.lastMove.from, activeGame.lastMove.to];
    }
    return undefined;
  }, [activeGame?.lastMove]);

  return (
    <NextChessground
      key={fen} // Force re-render when FEN changes from server
      ref={ref}
      fen={fen}
      orientation={playerColor || 'white'}
      onMove={handleMove}
      lastMove={getLastMove()}
      readOnly={!isMyTurn}
    />
  );
};

export default LiveChessBoard;
