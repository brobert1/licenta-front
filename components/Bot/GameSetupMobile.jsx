import GameBot from './GameBot';
import GameSettings from './GameSettings';
import MobileBotBanner from './MobileBotBanner';

const GameSetupMobile = ({ isEngineReady, onStartGame }) => {
  return (
    <div className="h-[calc(100dvh-7rem)] flex flex-col gap-2 overflow-hidden">
      <MobileBotBanner staticMessage />
      <div className="bg-surface shadow-sm border border-border rounded-lg flex flex-col overflow-hidden min-h-0 flex-1">
        <GameBot />
        <GameSettings onStartGame={onStartGame} isEngineReady={isEngineReady} />
      </div>
    </div>
  );
};

export default GameSetupMobile;
