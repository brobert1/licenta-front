import { Plural } from '@components';

const ProgressBar = ({ completedCount, totalCount, one, many }) => {
  const safeTotal = totalCount || 0;
  const safeCompleted = Math.min(completedCount || 0, safeTotal);
  const progressPercent = safeTotal > 0 ? (safeCompleted / safeTotal) * 100 : 0;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-landing text-secondary-muted">
          {safeCompleted} / <Plural one={one} many={many} count={safeTotal} /> completed
        </span>
        <span className="text-xs font-landing font-semibold text-on-surface">
          {safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-outline-variant/20 overflow-hidden">
        <div
          className="h-full rounded-full bg-tertiaryGold transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
