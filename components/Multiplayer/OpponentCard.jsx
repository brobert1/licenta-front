import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import Timer from './Timer';
import { useState, useEffect } from 'react';

const OpponentCard = ({ onTimeOut }) => {
  const {
    opponent,
    playerColor,
    activeGame,
    whiteTime,
    blackTime,
    opponentDisconnected,
    opponentDisconnectTime,
  } = useMultiplayerContext();

  // Countdown state for disconnect timer
  const [disconnectCountdown, setDisconnectCountdown] = useState(null);

  // Update countdown every second when opponent is disconnected
  useEffect(() => {
    if (!opponentDisconnected || !opponentDisconnectTime) {
      setDisconnectCountdown(null);
      return;
    }

    const updateCountdown = () => {
      const remaining = Math.max(0, Math.ceil((opponentDisconnectTime - Date.now()) / 1000));
      setDisconnectCountdown(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [opponentDisconnected, opponentDisconnectTime]);

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
        <div className="bg-tertiary rounded relative">
          <img
            src={avatarSrc}
            className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
            alt="Opponent Avatar"
          />
          {opponentDisconnected && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-secondary flex items-center justify-center">
              <i className="fas fa-wifi text-[8px] text-white"></i>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-medium text-base">{opponent.name}</p>
            <p className="text-gray-300">({opponent.elo})</p>
            {opponentDisconnected && disconnectCountdown !== null && (
              <span className="text-yellow-500 text-xs flex items-center gap-1 animate-pulse">
                <i className="fas fa-clock text-[10px]"></i>
                Disconnected ({disconnectCountdown}s)
              </span>
            )}
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
