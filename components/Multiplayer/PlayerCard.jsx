import { useQuery } from '@hooks';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import Timer from './Timer';

const PlayerCard = ({ onTimeOut }) => {
  const { data: me } = useQuery('/client/account');
  const { playerColor, activeGame, whiteTime, blackTime } = useMultiplayerContext();

  // Get player's time based on their color
  const playerTime = playerColor === 'white' ? whiteTime : blackTime;

  // Determine whose turn it is from FEN
  const currentTurn = activeGame?.fen?.split(' ')[1] === 'w' ? 'white' : 'black';
  const isPlayerTurn = currentTurn === playerColor;

  // Check if time control is enabled (not unlimited)
  const hasTimeControl = activeGame?.timeControl?.initial > 0;
  const isGameActive = activeGame?.status === 'active' && !activeGame?.gameOver;

  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-tertiary rounded">
          {me?.image?.path ? (
            <img
              src={me.image.path}
              className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
              alt="Your Avatar"
            />
          ) : (
            <div className="lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center rounded-md bg-primary">
              <span className="text-white font-bold text-xl">{me?.name?.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-medium text-base">{me?.name}</p>
            <p className="text-gray-300">({me?.elo || 1200})</p>
          </div>
          <p className="text-gray-400 text-sm">{playerColor === 'white' ? 'White' : 'Black'}</p>
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
