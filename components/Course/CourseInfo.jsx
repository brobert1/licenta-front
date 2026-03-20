import { StarRating } from '@components';

const CourseInfo = ({ name, description, rating, difficulty, lessonsCount, sale, isOwned }) => (
  <div className="flex flex-col">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-5">
      <span>Learn</span>
      <i className="fa-regular fa-chevron-right text-[9px]" />
      <span>{difficulty}</span>
    </div>

    {/* Title */}
    <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-5 leading-[1.1]">
      {name}
    </h1>

    {/* Description */}
    <p className="font-landing text-secondary-muted text-sm mb-6 leading-relaxed line-clamp-5">
      {description}
    </p>

    {/* Sale badge */}
    {sale?.isActive && !isOwned && (
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 border border-yellow-400/30 text-xs font-semibold">
          <i className="fa-solid fa-bolt" />
          Limited Time Sale
        </span>
      </div>
    )}

    {/* Stats row */}
    <div className="flex flex-wrap items-center gap-5 text-secondary-muted">
      <div className="flex items-center gap-1.5">
        <StarRating value={rating} readOnly />
        <span className="font-landing text-sm text-on-surface ml-1">{rating}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <i className="fa-regular fa-clock text-sm" />
        <span className="font-landing text-sm">{lessonsCount} Lessons</span>
      </div>
      <div className="flex items-center gap-1.5">
        <i className="fa-regular fa-signal-bars text-sm" />
        <span className="font-landing text-sm capitalize">{difficulty} Level</span>
      </div>
    </div>
  </div>
);

export default CourseInfo;
