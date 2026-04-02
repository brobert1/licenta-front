import { Bone } from '@components';
import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { classnames } from '@lib';

const ReviewPlayerCards = ({
  game,
  me,
  whiteAccuracy,
  blackAccuracy,
  isLoading,
  showAccuracy = true,
}) => {
  const {
    playerColor,
    playerName,
    botName,
    outcome,
    white: uploadedWhite,
    black: uploadedBlack,
  } = game || {};

  const userColor = playerColor || 'white';
  const white = playerColor
    ? userColor === 'white'
      ? playerName
      : botName
    : uploadedWhite || 'White';
  const black = playerColor
    ? userColor === 'black'
      ? playerName
      : botName
    : uploadedBlack || 'Black';
  const whiteWon =
    (outcome === 'win' && userColor === 'white') || (outcome === 'loss' && userColor === 'black');
  const blackWon =
    (outcome === 'win' && userColor === 'black') || (outcome === 'loss' && userColor === 'white');

  const generateAvatar = (seed) =>
    createAvatar(avataaars, { seed, size: 80, backgroundColor: ['404040'] }).toDataUri();

  const botAvatar = generateAvatar(botName);

  const playerAvatar = (name) =>
    me?.image?.path ? (
      <img src={me.image.path} className="w-14 h-14 object-cover rounded" alt={name} />
    ) : (
      <img src={generateAvatar(name)} className="w-14 h-14 object-cover rounded" alt={name} />
    );

  const whiteAvatar =
    userColor === 'white' ? (
      playerAvatar(white)
    ) : (
      <img src={botAvatar} className="w-14 h-14 object-cover rounded" alt={white} />
    );

  const blackAvatar =
    userColor === 'black' ? (
      playerAvatar(black)
    ) : (
      <img src={botAvatar} className="w-14 h-14 object-cover rounded" alt={black} />
    );

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-3 items-center mb-3">
        <div></div>
        <span className="text-primary font-bold text-sm text-center truncate">{white}</span>
        <span className="text-primary font-bold text-sm text-center truncate">{black}</span>
      </div>
      <div className="grid grid-cols-3 items-center mb-3">
        <span className="text-muted text-sm">Players</span>
        <div className="flex justify-center">
          <div
            className={classnames(
              'bg-tertiary border-2 rounded',
              whiteWon ? 'border-yellow-500' : 'border-border'
            )}
          >
            {whiteAvatar}
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className={classnames(
              'bg-tertiary border-2 rounded',
              blackWon ? 'border-yellow-500' : 'border-border'
            )}
          >
            {blackAvatar}
          </div>
        </div>
      </div>
      {showAccuracy && (
        <div className="grid grid-cols-3 items-center">
          <span className="text-gray-400 text-sm">Accuracy</span>
          <div className="flex justify-center">
            <div className="bg-white border rounded px-3 py-1 min-w-12 text-center">
              {isLoading ? (
                <Bone type="loading" extraClass="w-8" />
              ) : (
                <span className="text-gray-900 font-bold text-sm">{whiteAccuracy}</span>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-black rounded px-3 py-1 min-w-12 text-center">
              {isLoading ? (
                <Bone type="loading" extraClass="w-8" />
              ) : (
                <span className="text-white font-bold text-sm">{blackAccuracy}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPlayerCards;
