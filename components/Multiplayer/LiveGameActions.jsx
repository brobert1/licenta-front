import { Button } from '@components';
import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useEffect, useState } from 'react';
import DrawOfferCard from './DrawOfferCard';
import ResignConfirmCard from './ResignConfirmCard';

const LiveGameActions = ({ onPrevMove, onNextMove }) => {
  const { setResignPending, offerDraw, drawOfferState, drawCooldown } = useMultiplayerContext();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    if (drawCooldown > Date.now()) {
      const updateTimer = () => {
        const remaining = Math.max(0, Math.ceil((drawCooldown - Date.now()) / 1000));
        setCooldownRemaining(remaining);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
    setCooldownRemaining(0);
  }, [drawCooldown]);

  const isCooldownActive = cooldownRemaining > 0;
  const canOfferDraw = drawOfferState === 'none' && !isCooldownActive;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-black/10 bg-gameplay p-4">
      <DrawOfferCard />
      <ResignConfirmCard />
      <div className="flex gap-3">
        <div className="flex flex-1 gap-2">
          <button
            type="button"
            onClick={offerDraw}
            disabled={!canOfferDraw}
            className={
              canOfferDraw
                ? 'flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-gameplay-control py-2.5 px-3 font-landing text-sm font-semibold text-on-surface transition-colors hover:bg-gameplay-elevated'
                : 'flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-black/10 bg-gameplay py-2.5 px-3 font-landing text-sm font-semibold text-secondary-muted opacity-60'
            }
            title={isCooldownActive ? `Wait ${cooldownRemaining}s` : 'Offer Draw'}
          >
            {isCooldownActive ? (
              <span className="font-mono text-sm">{cooldownRemaining}s</span>
            ) : (
              <>
                <i className="fas fa-handshake"></i>
                <span className="hidden truncate sm:inline">Offer Draw</span>
                <span className="sm:hidden">Draw</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setResignPending(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2.5 px-3 font-landing text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
            title="Resign"
          >
            <i className="fas fa-flag"></i>
            <span className="hidden truncate sm:inline">Resign</span>
            <span className="sm:hidden">Resign</span>
          </button>
        </div>
        <div className="flex gap-1 border-l border-black/10 pl-2">
          <Button
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-black/10 bg-gameplay-control text-lg text-on-surface transition-colors hover:bg-gameplay-elevated"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-black/10 bg-gameplay-control text-lg text-on-surface transition-colors hover:bg-gameplay-elevated"
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
