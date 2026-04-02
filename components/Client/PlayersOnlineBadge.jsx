'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { classnames } from '@lib';

const PlayersOnlineBadge = () => {
  const { isConnected, playersOnline } = useMultiplayerContext();

  return (
    <span
      className={classnames(
        'inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium',
        isConnected ? 'bg-surface text-primary' : 'bg-secondary text-muted'
      )}
      title="Players connected to live play"
    >
      {isConnected ? (
        <>
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {playersOnline.toLocaleString()} online
        </>
      ) : (
        <>
          <i className="fa-regular fa-circle-notch fa-spin text-xs" />
          Connecting…
        </>
      )}
    </span>
  );
};

export default PlayersOnlineBadge;
