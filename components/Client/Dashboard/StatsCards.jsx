import { useQuery } from '@hooks';

const StatCard = ({ label, value, delta, subtext }) => (
  <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm">
    <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-1">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      {value === null ? (
        <div className="h-8 w-20 bg-surface-container-high rounded animate-pulse" />
      ) : (
        <p className="font-headline text-3xl text-on-surface">{value}</p>
      )}
      {delta && (
        <span className={`text-sm font-landing font-semibold ${
          delta.startsWith('+') ? 'text-green-500' : delta.startsWith('-') ? 'text-red-500' : 'text-tertiaryGold'
        }`}>
          {delta}
        </span>
      )}
    </div>
    {subtext && <p className="text-sm font-landing text-secondary-muted mt-1">{subtext}</p>}
  </div>
);

const StatsCards = () => {
  const { data: me } = useQuery('/client/account');
  const { data: stats } = useQuery('/client/play/stats');
  const { data: dailyStats } = useQuery('/client/play/stats/daily');

  const eloGained = dailyStats?.eloGained ?? 0;
  const eloDelta = eloGained > 0 ? `+${eloGained}` : eloGained < 0 ? `${eloGained}` : null;

  const winRateLabel = stats?.winRate != null ? `${stats.winRate}%` : null;
  const wlRecord = stats
    ? `${stats.wins}W · ${stats.draws}D · ${stats.losses}L`
    : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <StatCard
        label="Current ELO"
        value={me?.elo ?? null}
        delta={eloDelta}
      />
      <StatCard
        label="Games Played"
        value={stats?.games ?? null}
        subtext={wlRecord}
      />
      <StatCard
        label="Win Rate"
        value={winRateLabel}
        subtext={stats?.games > 0 ? 'All time' : 'No games yet'}
      />
    </div>
  );
};

export default StatsCards;
