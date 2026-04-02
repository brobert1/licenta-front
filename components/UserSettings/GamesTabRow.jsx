import { BotAvatar } from '@components/Bot';
import { Link } from '@components';
import { classnames } from '@lib';
import { useMemo } from 'react';

const getResultStyles = (score) => {
  if (score === '1') return { bg: 'bg-green-600', icon: 'fa-plus' };
  if (score === '0') return { bg: 'bg-red-600', icon: 'fa-minus' };
  return { bg: 'bg-amber-500', icon: '' };
};

const GamesTabRow = ({ game, gameSource = 'bot', opponentName, opponentElo, userScore }) => {
  const { bg, icon } = useMemo(() => getResultStyles(userScore), [userScore]);
  const isOnline = gameSource === 'online';

  return (
    <Link
      href={`/client/play/view-game/${game._id}`}
      className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
    >
      <div className="flex w-6 flex-shrink-0 items-center justify-center text-muted">
        <i
          className={isOnline ? 'fa-solid fa-globe text-base text-interactive' : 'fa-regular fa-robot text-base'}
          title={isOnline ? 'Online' : 'Bot'}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
          <BotAvatar alt={opponentName} name={opponentName} elo={opponentElo} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="truncate font-medium text-primary">{opponentName}</span>
          {opponentElo != null && (
            <span className="ml-1.5 text-sm text-muted">({opponentElo})</span>
          )}
        </div>
      </div>
      <div
        className={classnames('flex h-4 w-4 flex-shrink-0 items-center justify-center rounded', bg)}
      >
        {icon ? (
          <i className={classnames('fa-solid', icon, 'text-xs text-white')} />
        ) : (
          <span className="text-xs font-medium text-white">½</span>
        )}
      </div>
      <Link
        href={`/client/game-review/${game._id}`}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-accent text-white hover:bg-accent/90"
        title="Review game"
      >
        <i className="fa-solid fa-circle-star text-sm" />
      </Link>
    </Link>
  );
};

export default GamesTabRow;
