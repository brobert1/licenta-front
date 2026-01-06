import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const ResignConfirmCard = () => {
  const { resignPending, confirmResign, cancelResign } = useMultiplayerContext();

  if (!resignPending) return null;

  return (
    <div className="flex flex-col bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-3 animate-fade-in shadow-lg shadow-red-900/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
          <i className="fas fa-flag text-red-400 text-sm"></i>
        </div>
        <div>
          <p className="text-red-100 font-semibold text-sm">Resign Game?</p>
          <p className="text-red-200/60 text-xs">This action cannot be undone</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={confirmResign}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 hover:scale-[1.02] border border-red-500/30 text-red-300 text-sm font-medium py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <i className="fas fa-check text-xs"></i>
          Yes, Resign
        </button>
        <button
          onClick={cancelResign}
          className="flex-1 bg-white/5 hover:bg-white/10 hover:scale-[1.02] border border-white/10 text-gray-300 text-sm font-medium py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <i className="fas fa-times text-xs"></i>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResignConfirmCard;
