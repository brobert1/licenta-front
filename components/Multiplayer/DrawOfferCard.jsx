import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const DrawOfferCard = () => {
  const { drawOfferState, acceptDraw, declineDraw } = useMultiplayerContext();

  if (drawOfferState === 'none') return null;

  // Sent - waiting for opponent response
  if (drawOfferState === 'sent') {
    return (
      <div className="flex flex-col bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-3 animate-fade-in shadow-lg shadow-amber-900/10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-5 h-5">
            <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <p className="text-amber-200 font-semibold text-sm">Draw Offer Sent</p>
            <p className="text-amber-200/60 text-xs mt-0.5">Waiting for opponent...</p>
          </div>
        </div>
      </div>
    );
  }

  // Received - can accept or decline
  if (drawOfferState === 'received') {
    return (
      <div className="flex flex-col bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-3 animate-fade-in shadow-lg shadow-blue-900/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <i className="fas fa-handshake text-blue-400 text-sm"></i>
          </div>
          <div>
            <p className="text-blue-100 font-semibold text-sm">Draw Offered</p>
            <p className="text-blue-200/60 text-xs">Opponent suggests a draw</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={acceptDraw}
            className="flex-1 bg-green-500/20 hover:bg-green-500/30 hover:scale-[1.02] border border-green-500/30 text-green-300 text-sm font-medium py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <i className="fas fa-check text-xs"></i>
            Accept
          </button>
          <button
            onClick={declineDraw}
            className="flex-1 bg-white/5 hover:bg-white/10 hover:scale-[1.02] border border-white/10 text-gray-300 text-sm font-medium py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <i className="fas fa-times text-xs"></i>
            Decline
          </button>
        </div>
      </div>
    );
  }

  // Declined - show message briefly
  if (drawOfferState === 'declined') {
    return (
      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-3 animate-fade-in shadow-lg shadow-red-900/10">
        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-times text-red-400 text-sm"></i>
        </div>
        <div>
          <p className="text-red-200 font-semibold text-sm">Draw Declined</p>
          <p className="text-red-200/60 text-xs mt-0.5">Keep playing!</p>
        </div>
      </div>
    );
  }

  return null;
};

export default DrawOfferCard;
