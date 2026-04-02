import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext, useBotEngineContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import Timer from './Timer';

const BotCard = ({
  showTimer = false,
  mutation,
  timerKey,
  onTimeChange,
  initialTime,
  isEngineReady: isEngineReadyProp,
}) => {
  const { selectedBot, gameSettings, handleGameOver, gameWinner } = useBotContext();
  const { currentFen } = useChessContext();
  const { isReady: isEngineReadyDefault } = useBotEngineContext();
  const isEngineReady = isEngineReadyProp ?? isEngineReadyDefault;

  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const playerColor = gameSettings.playerColor;
  const isBotTurn = !gameWinner && currentTurn !== (playerColor === 'white' ? 'w' : 'b');

  const handleBotTimeout = () => {
    handleGameOver(null, mutation, false, currentFen);
  };

  const generateBotAvatar = (name) => {
    const avatar = createAvatar(avataaars, {
      seed: name,
      size: 48,
      backgroundColor: ['404040'],
    });

    return avatar.toDataUri();
  };

  const botAvatarSrc = generateBotAvatar(selectedBot.name);

  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-surface border border-border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-secondary rounded">
          <img
            src={botAvatarSrc}
            className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
            alt="Bot Avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span
              className={`w-2 h-2 rounded-full ${isEngineReady ? 'bg-green-500' : 'bg-red-500'}`}
              title={isEngineReady ? 'Engine ready' : 'Engine loading'}
            />
            <p className="text-primary font-medium text-base">{selectedBot.name}</p>
            <p className="text-muted">({selectedBot.elo})</p>
          </div>
        </div>
      </div>
      {showTimer && (
        <Timer
          key={timerKey}
          initialTime={initialTime || gameSettings.timeControl.minutes * 60}
          isActive={isBotTurn}
          increment={gameSettings.timeControl.increment}
          onTimeOut={handleBotTimeout}
          onTimeChange={onTimeChange}
        />
      )}
    </div>
  );
};

export default BotCard;
