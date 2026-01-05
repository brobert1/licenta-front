import { useMultiplayerContext } from '@contexts/MultiplayerContext';

const LiveGameActions = () => {
  const { resign, offerDraw } = useMultiplayerContext();

  return (
    <div className="flex gap-3 p-4 bg-tertiary border-t border-gray-700">
      <button
        onClick={offerDraw}
        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
      >
        <i className="fas fa-handshake mr-2"></i>
        Offer Draw
      </button>
      <button
        onClick={resign}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
      >
        <i className="fas fa-flag mr-2"></i>
        Resign
      </button>
    </div>
  );
};

export default LiveGameActions;
