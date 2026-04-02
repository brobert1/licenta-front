import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import { useBotChat } from '@hooks';
import { useMemo } from 'react';

const MobileBotBanner = ({ staticMessage = false }) => {
  const { selectedBot, gameSettings, gameWinner } = useBotContext();
  const { history, isUserTurn } = useChessContext();

  const { currentMessage } = useBotChat({
    history,
    playerColor: gameSettings.playerColor,
    gameWinner,
    isUserTurn,
  });

  const displayMessage = staticMessage
    ? selectedBot.message
    : currentMessage || selectedBot.message;

  const botAvatarSrc = useMemo(
    () =>
      createAvatar(avataaars, {
        seed: selectedBot.name,
        size: 56,
        backgroundType: ['transparent'],
      }).toDataUri(),
    [selectedBot.name]
  );

  return (
    <div className="md:hidden flex items-center gap-2.5">
      <img src={botAvatarSrc} className="h-14 w-14 flex-shrink-0" alt={selectedBot.name} />
      <div key={displayMessage} className="relative flex-1 animate-message-in">
        <div className="rounded-2xl border border-border bg-surface px-3 py-2.5 shadow-sm">
          <p className="text-primary text-sm font-medium leading-snug">{displayMessage}</p>
        </div>
        <span className="absolute -left-1 top-4 h-3 w-3 rotate-45 border-b border-l border-border bg-surface" />
      </div>
    </div>
  );
};

export default MobileBotBanner;
