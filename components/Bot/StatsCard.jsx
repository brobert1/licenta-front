const StatsCard = ({ data }) => {
  const { games, wins, draws, losses, winRate, drawRate, lossRate } = data;

  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <i className="fas fa-chart-simple text-xl text-primary"></i>
            <h3 className="text-xl font-bold text-primary">All games</h3>
          </div>
        </div>
        <div className="mb-4 text-center">
          <div className="mb-1 text-3xl font-bold text-primary">{games}</div>
          <div className="text-sm text-muted">Total Games</div>
        </div>
        <div className="w-full">
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center gap-10 justify-center">
              {winRate > 0 && (
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap font-medium text-green-600">
                    {wins} Won ({winRate}%)
                  </span>
                </div>
              )}
              {lossRate > 0 && (
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap font-medium text-accent">
                    {losses} Lost ({lossRate}%)
                  </span>
                </div>
              )}
            </div>
            {drawRate > 0 && (
              <div className="flex items-center justify-center gap-1">
                <span className="whitespace-nowrap font-medium text-amber-500">
                  {draws} Drawn ({drawRate}%)
                </span>
              </div>
            )}
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-tertiary">
            <div className="flex h-full">
              {winRate > 0 && (
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${winRate}%` }}
                ></div>
              )}
              {drawRate > 0 && (
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${drawRate}%` }}
                ></div>
              )}
              {lossRate > 0 && (
                <div
                  className="h-full bg-accent transition-all duration-500"
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
