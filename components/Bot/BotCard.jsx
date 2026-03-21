import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import Timer from './Timer';

const BotCard = ({ showTimer = false, show, mutation, timerKey, onTimeChange }) => {
  const { matchPlayerColor, selectedBot, gameSettings, handleGameOver } = useBotContext();
  const { currentFen } = useChessContext();

  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const playerColor = matchPlayerColor || gameSettings.playerColor;
  const safePlayerColor = playerColor === 'random' ? 'white' : playerColor;
  const isBotTurn = currentTurn !== (safePlayerColor === 'white' ? 'w' : 'b');

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
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gameplay rounded-xl border border-black/10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="bg-gameplay-elevated rounded-lg p-0.5 shrink-0">
          <img
            src={botAvatarSrc}
            className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
            alt="Bot Avatar"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap gap-x-2 gap-y-0 items-baseline">
            <p className="font-landing font-semibold text-sm text-on-surface truncate">{selectedBot.name}</p>
            <p className="font-landing text-xs text-grey shrink-0">({selectedBot.elo})</p>
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
