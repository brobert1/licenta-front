'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import Timer from './Timer';

const PlayerCard = ({ onTimeOut }) => {
  const { data: me } = useQuery('/client/account');
  const { playerColor, activeGame, whiteTime, blackTime } = useMultiplayerContext();

  const playerTime = playerColor === 'white' ? whiteTime : blackTime;
  const currentTurn = activeGame?.fen?.split(' ')[1] === 'w' ? 'white' : 'black';
  const isPlayerTurn = currentTurn === playerColor;
  const hasTimeControl = activeGame?.timeControl?.initial > 0;
  const isGameActive = activeGame?.status === 'active' && !activeGame?.gameOver;

  return (
    <div className="flex w-full min-w-0 shrink-0 items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="shrink-0 rounded-lg border border-border bg-secondary p-0.5">
          {me?.image?.path ? (
            <img
              src={me.image.path}
              className="h-10 w-10 rounded-md object-cover lg:h-12 lg:w-12"
              alt=""
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent lg:h-12 lg:w-12">
              <span className="text-lg font-bold text-white">{me?.name?.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-primary">{me?.name}</p>
            <p className="text-sm text-muted">({me?.elo ?? 400})</p>
          </div>
          <p className="text-xs text-muted">{playerColor === 'white' ? 'White' : 'Black'}</p>
        </div>
      </div>
      {hasTimeControl && (
        <Timer
          key={activeGame?._id}
          initialTime={activeGame?.timeControl?.initial || 180}
          serverTime={playerTime}
          isActive={isPlayerTurn && isGameActive}
          increment={activeGame?.timeControl?.increment || 0}
          onTimeOut={onTimeOut}
        />
      )}
    </div>
  );
};

export default PlayerCard;
