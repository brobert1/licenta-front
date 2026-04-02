'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { classnames } from '@lib';
import { useEffect, useState } from 'react';
import DrawOfferCard from './DrawOfferCard';
import ResignConfirmCard from './ResignConfirmCard';

const LiveGameActions = ({ onPrevMove, onNextMove }) => {
  const { offerDraw, drawOfferState, drawCooldown, setResignPending } = useMultiplayerContext();
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
    return undefined;
  }, [drawCooldown]);

  const isCooldownActive = cooldownRemaining > 0;
  const canOfferDraw = drawOfferState === 'none' && !isCooldownActive;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-border bg-secondary p-4">
      <DrawOfferCard />
      <ResignConfirmCard />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 flex-1 gap-2">
          <button
            type="button"
            onClick={offerDraw}
            disabled={!canOfferDraw}
            className={classnames(
              'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition-colors',
              canOfferDraw
                ? 'border-border bg-surface text-primary hover:bg-tertiary'
                : 'cursor-not-allowed border-border bg-secondary text-muted opacity-60'
            )}
            title={isCooldownActive ? `Wait ${cooldownRemaining}s` : 'Offer draw'}
          >
            {isCooldownActive ? (
              <span className="font-mono text-sm tabular-nums">{cooldownRemaining}s</span>
            ) : (
              <>
                <i className="fas fa-handshake shrink-0"></i>
                <span className="truncate">Draw</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setResignPending(true)}
            className="flex min-h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
            title="Resign"
          >
            <i className="fas fa-flag shrink-0"></i>
            <span className="truncate">Resign</span>
          </button>
        </div>
        <div className="flex justify-end gap-2 border-t border-border pt-2 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
          <button
            type="button"
            onClick={onPrevMove}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-surface text-lg text-primary transition-colors hover:bg-tertiary"
            aria-label="Previous move"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            type="button"
            onClick={onNextMove}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-surface text-lg text-primary transition-colors hover:bg-tertiary"
            aria-label="Next move"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveGameActions;
