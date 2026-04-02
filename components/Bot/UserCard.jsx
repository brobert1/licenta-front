import { useQuery } from '@hooks';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import { Timer } from '.';

const UserCard = ({ showTimer = false, mutation, timerKey, onTimeChange, initialTime }) => {
  const { isGuest, gameSettings, handleGameOver, gameWinner } = useBotContext();
  const { status, data: accountData } = useQuery('/client/account', { enabled: !isGuest });
  const { currentFen } = useChessContext();

  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const playerColor = gameSettings.playerColor;
  const isUserTurn = !gameWinner && currentTurn === (playerColor === 'white' ? 'w' : 'b');

  const handleUserTimeout = () => {
    handleGameOver(null, mutation, true, currentFen);
  };

  if (!isGuest && status === 'loading') {
    return (
      <div className="flex items-center gap-4 lg:p-2 p-1 bg-surface border border-border rounded-lg shadow-sm">
        <div className="bg-secondary lg:w-12 lg:h-12 w-10 h-10 rounded-md animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="w-16 h-4 bg-secondary rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-surface border border-border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-secondary rounded">
          {!isGuest && accountData?.image?.path ? (
            <img
              src={accountData.image?.path}
              className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
              alt="User Avatar"
            />
          ) : (
            <div className="lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center rounded-md">
              <i className="fas fa-user text-xl text-muted"></i>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-semibold text-base">
            {isGuest ? 'Guest' : accountData?.name || 'User'}
          </p>
        </div>
      </div>
      {showTimer && (
        <Timer
          key={timerKey}
          initialTime={initialTime || gameSettings.timeControl.minutes * 60}
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
