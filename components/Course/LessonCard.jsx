import { Link } from '@components';
import { slugify } from '@functions';
import { classnames } from '@lib';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircleProgress = ({ percent, isComplete }) => {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  return (
    <div className="relative flex-shrink-0 w-14 h-14">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={RADIUS} fill="none" strokeWidth="3.5" className="stroke-outline-variant/20" />
        <circle
          cx="28" cy="28" r={RADIUS} fill="none" strokeWidth="3.5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={isComplete ? 'stroke-green-500' : 'stroke-tertiaryGold'}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isComplete
          ? <i className="fa-solid fa-check text-green-500 text-sm" />
          : <span className="text-[11px] font-landing font-bold text-on-surface">{percent}%</span>
        }
      </div>
    </div>
  );
};

const LessonCard = ({
  _id: uuid,
  name,
  chapters,
  completedChapters,
  index,
  isOwned,
  isPreview,
  active,
}) => {
  const isLocked = isPreview ? false : !isOwned;
  const isInactive = isPreview && active === false;
  const lessonLabel = `LESSON${String((index ?? 0) + 1).padStart(2, '0')}`;
  const chapterCount = chapters?.length ?? 0;
  const completedCount = Math.min(completedChapters || 0, chapterCount);
  const progressPercent = chapterCount > 0 ? Math.round((completedCount / chapterCount) * 100) : 0;
  const isComplete = chapterCount > 0 && completedCount === chapterCount;

  const cardContent = (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <span className="text-[10px] font-landing font-extrabold text-tertiaryGold uppercase tracking-[0.15em]">
          {lessonLabel}
        </span>
        <h5 className="font-headline text-base text-on-surface leading-snug flex items-center gap-2">
          <span className="truncate">{name}</span>
          {isLocked && <i className="fa-regular fa-lock text-xs text-secondary-muted flex-shrink-0" />}
        </h5>
        <span className="text-xs font-landing text-secondary-muted">
          {chapterCount} {chapterCount === 1 ? 'lesson' : 'lessons'}
        </span>
      </div>

      {!isLocked && (
        <CircleProgress isComplete={isComplete} percent={progressPercent} />
      )}
    </div>
  );

  const sharedClass = classnames(
    'block w-full p-5 rounded-2xl border transition-all text-left',
    isInactive
      ? 'border-dashed border-outline-variant/30 opacity-50 bg-surface-container-lowest cursor-default'
      : isLocked
        ? 'border-outline-variant/20 bg-surface-container-lowest cursor-default'
        : isComplete
          ? 'border-green-200/60 bg-surface-container-lowest hover:shadow-sm cursor-pointer'
          : 'border-outline-variant/20 bg-surface-container-lowest hover:border-tertiaryGold/40 hover:shadow-sm cursor-pointer'
  );

  if (isLocked || isInactive) {
    return <div className={sharedClass}>{cardContent}</div>;
  }

  return (
    <Link href={`/client/study/${slugify(name, uuid)}`} className={sharedClass}>
      {cardContent}
    </Link>
  );
};

export default LessonCard;
