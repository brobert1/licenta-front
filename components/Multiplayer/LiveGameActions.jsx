import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { Button } from '@components';

const LiveGameActions = ({ onPrevMove, onNextMove }) => {
  const { resign, offerDraw } = useMultiplayerContext();

  return (
    <div className="flex flex-col bg-secondary p-4 border-t border-gray-700/50">
      <div className="flex gap-3">
        <div className="flex flex-1 gap-2">
          <button
            onClick={offerDraw}
            className="flex-1 bg-tertiary hover:bg-white/10 text-gray-200 font-medium py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 group border border-transparent hover:border-white/10"
            title="Offer Draw"
          >
            <i className="fas fa-handshake group-hover:scale-110 transition-transform"></i>
            <span className="text-sm truncate hidden sm:inline">Offer Draw</span>
            <span className="text-sm sm:hidden">Draw</span>
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
