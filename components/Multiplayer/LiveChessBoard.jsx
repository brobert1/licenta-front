'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { coffee } from '@functions';
import { NextChessground } from 'next-chessground';
import { useCallback, useEffect, useRef } from 'react';

const LiveChessBoard = () => {
  const ref = useRef();
  const { activeGame, playerColor, makeMove } = useMultiplayerContext();

  const fen = activeGame?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  const getTurnFromFen = useCallback((fenString) => {
    const parts = fenString.split(' ');
    return parts[1] === 'w' ? 'white' : 'black';
  }, []);

  const currentTurn = getTurnFromFen(fen);
  const isMyTurn = currentTurn === playerColor;

  const handleMove = useCallback(
    (chess) => {
      const history = chess.history({ verbose: true });
      const lastMove = history[history.length - 1];

      if (lastMove) {
        const move = {
          from: lastMove.from,
          to: lastMove.to,
        };
        if (lastMove.promotion) {
          move.promotion = lastMove.promotion;
        }

        makeMove(move);
      }
    },
    [makeMove]
  );

  useEffect(() => {
    const executePremove = async () => {
      if (isMyTurn && ref.current && ref.current.playPremove) {
        await coffee(100);
        ref.current.playPremove();
      }
    };
    executePremove();
  }, [isMyTurn]);

  const lastMove = activeGame?.lastMove
    ? [activeGame.lastMove.from, activeGame.lastMove.to]
    : undefined;

  return (
    <NextChessground
      ref={ref}
      fen={fen}
      orientation={playerColor || 'white'}
      onMove={handleMove}
      lastMove={lastMove}
      premoves={true}
    />
  );
};

export default LiveChessBoard;
