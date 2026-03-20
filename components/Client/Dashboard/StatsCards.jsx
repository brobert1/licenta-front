const StatCard = ({ label, value, delta, subtext }) => (
  <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm">
    <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-1">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <p className="font-headline text-3xl text-on-surface">{value}</p>
      {delta && (
        <span className="text-sm font-landing font-semibold text-tertiaryGold">{delta}</span>
      )}
    </div>
    {subtext && <p className="text-sm font-landing text-secondary-muted mt-1">{subtext}</p>}
  </div>
);

const StatsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
    <StatCard label="Current ELO" value="2450" delta="+12" />
    <StatCard label="Global Rank" value="#412" subtext="Top 0.5%" />
    <StatCard label="Weekly Win Rate" value="68%" subtext="18-4-6" />
  </div>
);

export default StatsCards;
