import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useEffect, useState } from 'react';
import Timer from './Timer';

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

  const [disconnectCountdown, setDisconnectCountdown] = useState(null);

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

  const opponentColor = playerColor === 'white' ? 'black' : 'white';
  const opponentTime = opponentColor === 'white' ? whiteTime : blackTime;
  const currentTurn = activeGame?.fen?.split(' ')[1] === 'w' ? 'white' : 'black';
  const isOpponentTurn = currentTurn === opponentColor;
  const hasTimeControl = activeGame?.timeControl?.initial > 0;
  const isGameActive = activeGame?.status === 'active' && !activeGame?.gameOver;

  const getAvatarSrc = () => {
    if (opponent?.image?.path) {
      return opponent.image.path;
    }
    const avatar = createAvatar(avataaars, {
      seed: opponent.name,
      size: 48,
      backgroundColor: ['e6e8ea'],
    });
    return avatar.toDataUri();
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="flex w-full min-w-0 shrink-0 items-center justify-between gap-3 rounded-xl border border-black/10 bg-gameplay px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative shrink-0 rounded-lg bg-gameplay-elevated p-0.5">
          <img
            src={avatarSrc}
            className="h-10 w-10 object-cover rounded-md lg:h-12 lg:w-12"
            alt="Opponent Avatar"
          />
          {opponentDisconnected && (
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gameplay bg-amber-500">
              <i className="fas fa-wifi text-xs text-white"></i>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-landing text-sm font-semibold text-on-surface">{opponent.name}</p>
            <p className="font-landing text-sm text-secondary-muted">({opponent.elo})</p>
            {opponentDisconnected && disconnectCountdown !== null && (
              <span className="flex items-center gap-1 font-landing text-xs text-amber-700">
                <i className="fas fa-clock text-xs"></i>
                Disconnected ({disconnectCountdown}s)
              </span>
            )}
          </div>
          <p className="font-landing text-xs text-secondary-muted">
            {opponentColor === 'white' ? 'White' : 'Black'}
          </p>
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
