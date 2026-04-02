'use client';

import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const DrawOfferCard = () => {
  const { drawOfferState, acceptDraw, declineDraw } = useMultiplayerContext();

  if (drawOfferState === 'none') return null;

  if (drawOfferState === 'sent') {
    return (
      <div className="mb-3 flex animate-fade-in flex-col rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-5 w-5 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-amber-300"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">Draw offer sent</p>
            <p className="mt-0.5 text-xs text-amber-800">Waiting for opponent…</p>
          </div>
        </div>
      </div>
    );
  }

  if (drawOfferState === 'received') {
    return (
      <div className="mb-3 flex animate-fade-in flex-col rounded-lg border border-sky-200 bg-sky-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
            <i className="fas fa-handshake text-sm text-sky-700"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-sky-950">Draw offered</p>
            <p className="text-xs text-sky-800">Your opponent suggests a draw</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={acceptDraw}
            className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100"
          >
            <i className="fas fa-check text-xs"></i>
            Accept
          </button>
          <button
            type="button"
            onClick={declineDraw}
            className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-semibold text-primary transition-colors hover:bg-tertiary"
          >
            <i className="fas fa-times text-xs"></i>
            Decline
          </button>
        </div>
      </div>
    );
  }

  if (drawOfferState === 'declined') {
    return (
      <div className="mb-3 flex animate-fade-in items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
          <i className="fas fa-times text-sm text-red-600"></i>
        </div>
        <div>
          <p className="text-sm font-semibold text-red-900">Draw declined</p>
          <p className="mt-0.5 text-xs text-red-800">Keep playing.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default DrawOfferCard;
