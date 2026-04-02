import { NoSsr } from '@components';
import { useEqualHeight } from '@hooks';
import { NextChessground } from 'next-chessground';
import BotCard from './BotCard';
import GameBot from './GameBot';
import GameSettings from './GameSettings';
import MobileBotBanner from './MobileBotBanner';
import UserCard from './UserCard';

const GameSetupDesktop = ({ gameSettings, boardKey, isEngineReady, onStartGame }) => {
  const { sourceRef, targetRef } = useEqualHeight({ desktopOnly: true });
  const boardOrientation = gameSettings.playerColor === 'black' ? 'black' : 'white';

  return (
    <div className="w-full grid grid-cols-5 gap-6">
      <div ref={sourceRef} className="col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <MobileBotBanner staticMessage />
        <BotCard isEngineReady={isEngineReady} />
        <NoSsr>
          <NextChessground
            key={boardKey}
            viewOnly
            fen={gameSettings.selectedPosition?.fen}
            orientation={boardOrientation}
          />
        </NoSsr>
        <UserCard />
      </div>
      <div
        ref={targetRef}
        className="col-span-2 bg-surface shadow-sm border border-border rounded-lg flex flex-col overflow-hidden min-h-0"
      >
        <GameBot />
        <GameSettings onStartGame={onStartGame} isEngineReady={isEngineReady} />
      </div>
    </div>
  );
};

export default GameSetupDesktop;
