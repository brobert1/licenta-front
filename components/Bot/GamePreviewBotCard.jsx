import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

const GamePreviewBotCard = ({ botElo, botName, mode }) => {
  const avatar = createAvatar(avataaars, {
    backgroundColor: ['404040'],
    seed: botName,
    size: 48,
  }).toDataUri();

  const isOnline = mode === 'online';

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-2 shadow-sm">
      <div className="rounded bg-secondary">
        <img
          src={avatar}
          className="h-12 w-12 rounded-md object-cover"
          alt={isOnline ? 'Opponent' : 'Bot'}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        {isOnline ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-interactive">Opponent</span>
        ) : null}
        <div className="flex items-center gap-2">
          <p className="text-base font-medium text-primary">{botName}</p>
          {botElo ? <p className="text-muted">({botElo})</p> : null}
        </div>
      </div>
    </div>
  );
};

export default GamePreviewBotCard;
