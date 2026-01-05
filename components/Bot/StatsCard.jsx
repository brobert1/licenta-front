const StatsCard = ({ data }) => {
  const { games, wins, draws, losses, winRate, drawRate, lossRate } = data;

  return (
    <div className="bg-neutral-800 rounded-lg shadow-sm border border-neutral-700 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="fas fa-chart-simple text-neutral-300 text-xl"></i>
            <h3 className="text-xl font-bold text-neutral-100">All games</h3>
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-neutral-100 mb-1">{games}</div>
          <div className="text-sm text-neutral-400">Total Games</div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 text-sm">
            {winRate > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-green-400 font-medium">
                  {wins} Won ({winRate}%)
                </span>
              </div>
            )}
            {drawRate > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                <span className="text-gray-300 font-medium">
                  {draws} Drawn ({drawRate}%)
                </span>
              </div>
            )}
            {lossRate > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span className="text-red-400 font-medium">
                  {losses} Lost ({lossRate}%)
                </span>
              </div>
            )}
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-4 overflow-hidden">
            <div className="h-full flex">
              {winRate > 0 && (
                <div
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${winRate}%` }}
                ></div>
              )}
              {drawRate > 0 && (
                <div
                  className="bg-gray-300 h-full transition-all duration-500"
                  style={{ width: `${drawRate}%` }}
                ></div>
              )}
              {lossRate > 0 && (
                <div
                  className="bg-red-500 h-full transition-all duration-500"
                  style={{ width: `${lossRate}%` }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
