import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import Timer from './Timer';

const OpponentCard = ({ onTimeOut }) => {
  const { opponent, playerColor, activeGame, whiteTime, blackTime } = useMultiplayerContext();

  if (!opponent) return null;

  // Determine opponent's color (opposite of player's color)
  const opponentColor = playerColor === 'white' ? 'black' : 'white';

  // Get opponent's time
  const opponentTime = opponentColor === 'white' ? whiteTime : blackTime;

  // Determine whose turn it is from FEN
  const currentTurn = activeGame?.fen?.split(' ')[1] === 'w' ? 'white' : 'black';
  const isOpponentTurn = currentTurn === opponentColor;

  // Check if time control is enabled (not unlimited)
  const hasTimeControl = activeGame?.timeControl?.initial > 0;
  const isGameActive = activeGame?.status === 'active' && !activeGame?.gameOver;

  const getAvatarSrc = () => {
    if (opponent?.image?.path) {
      return opponent.image.path;
    }
    const avatar = createAvatar(avataaars, {
      seed: opponent.name,
      size: 48,
      backgroundColor: ['404040'],
    });
    return avatar.toDataUri();
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-tertiary rounded">
          <img
            src={avatarSrc}
            className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
            alt="Opponent Avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-medium text-base">{opponent.name}</p>
            <p className="text-gray-300">({opponent.elo})</p>
          </div>
          <p className="text-gray-400 text-sm">{opponentColor === 'white' ? 'White' : 'Black'}</p>
        </div>
      </div>
      {hasTimeControl && (
        <Timer
          initialTime={activeGame?.timeControl?.initial || 180}
          serverTime={opponentTime}
          isActive={isOpponentTurn && isGameActive}
          increment={activeGame?.timeControl?.increment || 0}
          onTimeOut={onTimeOut}
        />
      )}
    </div>
  );
};

export default OpponentCard;
