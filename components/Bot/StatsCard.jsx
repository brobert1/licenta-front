const StatBox = ({ label, value, subtext, color, icon }) => (
  <div className="bg-tertiary p-4 rounded-lg border border-white/5 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold font-mono ${color}`}>{value}</p>
      {subtext && <p className="text-gray-500 text-xs mt-1">{subtext}</p>}
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 ${color}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
  </div>
);

const ProgressBar = ({ wins, draws, losses, total }) => {
  if (total === 0) return null;
  const winPct = (wins / total) * 100;
  const drawPct = (draws / total) * 100;
  const lossPct = (losses / total) * 100;

  return (
    <div className="flex h-3 rounded-full overflow-hidden w-full bg-tertiary">
      {wins > 0 && <div style={{ width: `${winPct}%` }} className="bg-green-500" />}
      {draws > 0 && <div style={{ width: `${drawPct}%` }} className="bg-gray-400" />}
      {losses > 0 && <div style={{ width: `${lossPct}%` }} className="bg-red-500" />}
    </div>
  );
};

const StatsCard = ({ data }) => {
  const { games, wins, draws, losses, winRate, drawRate, lossRate } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Total Games" value={games} color="text-white" icon="fa-chess-board" />
        <StatBox
          label="Wins"
          value={wins}
          subtext={`${winRate}%`}
          color="text-green-400"
          icon="fa-trophy"
        />
        <StatBox
          label="Draws"
          value={draws}
          subtext={`${drawRate}%`}
          color="text-gray-300"
          icon="fa-handshake"
        />
        <StatBox
          label="Losses"
          value={losses}
          subtext={`${lossRate}%`}
          color="text-red-400"
          icon="fa-flag"
        />
      </div>

      {/* Progress Bar with Legend */}
      <div className="bg-secondary p-6 rounded-xl border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
          <div className="flex gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-gray-300">Won</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              <span className="text-gray-300">Draw</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <span className="text-gray-300">Lost</span>
            </div>
          </div>
        </div>
        <ProgressBar wins={wins} draws={draws} losses={losses} total={games} />
      </div>
    </div>
  );
};

export default StatsCard;
