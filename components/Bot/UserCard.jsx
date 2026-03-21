import { useQuery } from '@hooks';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import { Timer } from '.';

const UserCard = ({ showTimer = false, show, mutation, timerKey, onTimeChange }) => {
  const { status, data: accountData } = useQuery('/client/account');
  const { gameSettings, handleGameOver, matchPlayerColor } = useBotContext();
  const { currentFen } = useChessContext();

  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const playerColor = matchPlayerColor || gameSettings.playerColor;
  const safePlayerColor = playerColor === 'random' ? 'white' : playerColor;
  const isUserTurn = currentTurn === (safePlayerColor === 'white' ? 'w' : 'b');

  const handleUserTimeout = () => {
    handleGameOver(null, mutation, show, true);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-gameplay rounded-xl border border-black/10">
        <div className="bg-gameplay-elevated lg:w-12 lg:h-12 w-10 h-10 rounded-lg animate-pulse shrink-0" />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="w-24 h-4 bg-gameplay-elevated rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gameplay rounded-xl border border-black/10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="bg-gameplay-elevated rounded-lg p-0.5 shrink-0">
          {accountData?.image?.path ? (
            <img
              src={accountData.image?.path}
              className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
              alt="User Avatar"
            />
          ) : (
            <div className="lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center rounded-md">
              <i className="fas fa-user text-xl text-on-surface"></i>
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-landing font-semibold text-sm text-on-surface truncate">
            {accountData?.name || 'User'}
          </p>
        </div>
      </div>
      {showTimer && (
        <Timer
          key={timerKey}
          initialTime={gameSettings.timeControl.minutes * 60}
          isActive={isUserTurn}
          increment={gameSettings.timeControl.increment}
          onTimeOut={handleUserTimeout}
          onTimeChange={onTimeChange}
        />
      )}
    </div>
  );
};

export default UserCard;
