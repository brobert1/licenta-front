import { useState, useEffect } from 'react';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { Button } from '@components';
import DrawOfferCard from './DrawOfferCard';

const LiveGameActions = ({ onPrevMove, onNextMove }) => {
  const { resign, offerDraw, drawOfferState, drawCooldown } = useMultiplayerContext();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Update cooldown timer
  useEffect(() => {
    if (drawCooldown > Date.now()) {
      const updateTimer = () => {
        const remaining = Math.max(0, Math.ceil((drawCooldown - Date.now()) / 1000));
        setCooldownRemaining(remaining);
      };

      updateTimer(); // Initial update
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setCooldownRemaining(0);
    }
  }, [drawCooldown]);

  // Disable if offer in progress OR cooldown active
  const isCooldownActive = cooldownRemaining > 0;
  const canOfferDraw = drawOfferState === 'none' && !isCooldownActive;

  return (
    <div className="flex flex-col bg-secondary p-4 border-t border-gray-700/50">
      <DrawOfferCard />
      <div className="flex gap-3">
        <div className="flex flex-1 gap-2">
          <button
            onClick={offerDraw}
            disabled={!canOfferDraw}
            className={`flex-1 font-medium py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 group border ${
              canOfferDraw
                ? 'bg-tertiary hover:bg-white/10 text-gray-200 border-transparent hover:border-white/10'
                : 'bg-tertiary/50 text-gray-500 border-transparent cursor-not-allowed'
            }`}
            title={isCooldownActive ? `Wait ${cooldownRemaining}s` : 'Offer Draw'}
          >
            {isCooldownActive ? (
              <span className="text-sm font-mono">{cooldownRemaining}s</span>
            ) : (
              <>
                <i
                  className={`fas fa-handshake ${
                    canOfferDraw ? 'group-hover:scale-110' : ''
                  } transition-transform`}
                ></i>
                <span className="text-sm truncate hidden sm:inline">Offer Draw</span>
                <span className="text-sm sm:hidden">Draw</span>
              </>
            )}
          </button>
          <button
            onClick={resign}
            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 group border border-red-500/20 hover:border-red-500/30"
            title="Resign"
          >
            <i className="fas fa-flag group-hover:scale-110 transition-transform"></i>
            <span className="text-sm truncate hidden sm:inline">Resign</span>
            <span className="text-sm sm:hidden">Resign</span>
          </button>
        </div>
        <div className="flex gap-1 pl-2 border-l border-gray-700">
          <Button
            className="button tertiary text-lg h-full aspect-square flex items-center justify-center hover:bg-white/10 !rounded-lg transition-colors bg-tertiary w-12"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="button tertiary text-lg h-full aspect-square flex items-center justify-center hover:bg-white/10 !rounded-lg transition-colors bg-tertiary w-12"
            onClick={onNextMove}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveGameActions;
