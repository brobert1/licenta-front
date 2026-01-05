import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import Timer from './Timer';

const BotCard = ({ showTimer = false, show, mutation, timerKey, onTimeChange }) => {
  const { selectedBot, gameSettings, handleGameOver } = useBotContext();
  const { currentFen } = useChessContext();

  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const playerColor = gameSettings.playerColor;
  const isBotTurn = currentTurn !== (playerColor === 'white' ? 'w' : 'b');

  const handleBotTimeout = () => {
    handleGameOver(null, mutation, show, false);
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
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-tertiary rounded">
          <img
            src={botAvatarSrc}
            className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
            alt="Bot Avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-medium text-base">{selectedBot.name}</p>
            <p className="text-gray-300">({selectedBot.elo})</p>
          </div>
        </div>
      </div>
      {showTimer && (
        <Timer
          key={timerKey}
          initialTime={gameSettings.timeControl.minutes * 60}
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
