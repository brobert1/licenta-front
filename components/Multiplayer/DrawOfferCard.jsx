import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const DrawOfferCard = () => {
  const { drawOfferState, acceptDraw, declineDraw } = useMultiplayerContext();

  if (drawOfferState === 'none') return null;

  if (drawOfferState === 'sent') {
    return (
      <div className="mb-3 flex animate-fade-in flex-col rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-5 w-5 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-amber-300"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          </div>
          <div>
            <p className="font-landing text-sm font-semibold text-amber-900">Draw Offer Sent</p>
            <p className="mt-0.5 font-landing text-xs text-amber-800">Waiting for opponent...</p>
          </div>
        </div>
      </div>
    );
  }

  if (drawOfferState === 'received') {
    return (
      <div className="mb-3 flex animate-fade-in flex-col rounded-xl border border-sky-200 bg-sky-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
            <i className="fas fa-handshake text-sm text-sky-700"></i>
          </div>
          <div>
            <p className="font-landing text-sm font-semibold text-sky-950">Draw Offered</p>
            <p className="font-landing text-xs text-sky-800">Opponent suggests a draw</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={acceptDraw}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 py-2 px-3 font-landing text-sm font-medium text-green-800 transition-colors hover:bg-green-100"
          >
            <i className="fas fa-check text-xs"></i>
            Accept
          </button>
          <button
            type="button"
            onClick={declineDraw}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-gameplay-control py-2 px-3 font-landing text-sm font-medium text-on-surface transition-colors hover:bg-gameplay-elevated"
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
      <div className="mb-3 flex animate-fade-in items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
          <i className="fas fa-times text-sm text-red-600"></i>
        </div>
        <div>
          <p className="font-landing text-sm font-semibold text-red-900">Draw Declined</p>
          <p className="mt-0.5 font-landing text-xs text-red-800">Keep playing!</p>
        </div>
      </div>
    );
  }

  return null;
};

export default DrawOfferCard;
