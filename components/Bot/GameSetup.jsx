import { NoSsr } from '@components';
import { GameBot, GameSettings, BotCard, UserCard } from '@components/Bot';
import { useBotContext } from '@contexts/BotContext';
import { useEqualHeight, useRerender } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';

const GameSetup = ({ onStartGame }) => {
  const { sourceRef, targetRef } = useEqualHeight();
  const { gameSettings } = useBotContext();
  const [boardKey, rerender] = useRerender('board');

  useEffect(() => {
    rerender();
  }, [gameSettings.playerColor, gameSettings.selectedPosition]);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      <div ref={sourceRef} className="md:col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <BotCard />
        <NoSsr>
          <NextChessground
            key={boardKey}
            readOnly
            fen={gameSettings.selectedPosition?.fen}
            orientation={gameSettings.playerColor}
          />
        </NoSsr>
        <UserCard />
      </div>
      <div
        ref={targetRef}
        className="md:col-span-2 bg-secondary rounded-lg flex flex-col overflow-hidden min-h-[800px] md:min-h-0"
      >
        <GameBot />
        <GameSettings onStartGame={onStartGame} />
      </div>
    </div>
  );
};

export default GameSetup;
