import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const OpponentCard = ({ showTimer = false, timerValue }) => {
  const { opponent, playerColor } = useMultiplayerContext();

  if (!opponent) return null;

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
            className="lg:w-12 lg:h12 w-10 h-10 object-cover rounded-md"
            alt="Opponent Avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-medium text-base">{opponent.name}</p>
            <p className="text-gray-300">({opponent.elo})</p>
          </div>
          <p className="text-gray-400 text-sm">{playerColor === 'white' ? 'Black' : 'White'}</p>
        </div>
      </div>
      {showTimer && timerValue !== undefined && (
        <div className="bg-tertiary px-4 py-2 rounded-lg">
          <p className="text-white font-mono text-lg tabular-nums">
            {Math.floor(timerValue / 60)}:{String(timerValue % 60).padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  );
};

export default OpponentCard;
