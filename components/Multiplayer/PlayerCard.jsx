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
    <div className="flex w-full min-w-0 shrink-0 items-center justify-between gap-3 rounded-xl border border-black/10 bg-gameplay px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="shrink-0 rounded-lg bg-gameplay-elevated p-0.5">
          {me?.image?.path ? (
            <img
              src={me.image.path}
              className="h-10 w-10 object-cover rounded-md lg:h-12 lg:w-12"
              alt="Your Avatar"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-md lg:h-12 lg:w-12">
              <span className="text-lg font-bold text-on-surface">{me?.name?.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-landing text-sm font-semibold text-on-surface">{me?.name}</p>
            <p className="font-landing text-sm text-secondary-muted">({me?.elo || 1200})</p>
          </div>
          <p className="font-landing text-xs text-secondary-muted">
            {playerColor === 'white' ? 'White' : 'Black'}
          </p>
        </div>
      </div>
      {hasTimeControl && (
        <Timer
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
