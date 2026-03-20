import { Link } from '@components';
import { slugify } from '@functions';
import { size } from 'lodash';

const DIFFICULTY_BADGE = {
  novice: { cls: 'bg-sky-500 text-white', label: 'Novice' },
  beginner: { cls: 'bg-green-500 text-white', label: 'Beginner' },
  intermediate: { cls: 'bg-blue-500 text-white', label: 'Intermediate' },
  advanced: { cls: 'bg-red-500 text-white', label: 'Advanced' },
  expert: { cls: 'bg-purple-500 text-white', label: 'Expert' },
};

const CourseCard = ({
  name,
  preview,
  author,
  tags,
  content,
  difficulty,
  isPaid,
  price,
  currency,
  ...props
}) => {
  const lessons = content?.filter((i) => i.kind === 'study');
  const lessonCount = size(lessons);
  const href = `/client/courses/${slugify(name, props._id)}`;
  const category = tags?.[0];
  const badge = DIFFICULTY_BADGE[difficulty];

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high">
        {preview?.image?.path ? (
          <img
            src={preview.image.path}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high gap-2">
            <i className="fa-regular fa-chess-knight text-5xl text-secondary-muted/40" />
          </div>
        )}

        {/* Gradient overlay for bottom badges */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Difficulty badge — top left */}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${badge.cls}`}
          >
            {badge.label}
          </span>
        )}

        {/* Lesson count — bottom right */}
        {lessonCount > 0 && (
          <span className="absolute bottom-2.5 right-3 text-white text-xs font-semibold font-landing">
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        {category && (
          <p className="text-[10px] font-landing font-extrabold text-tertiaryGold uppercase tracking-[0.15em] mb-2">
            {category}
          </p>
        )}

        {/* Title */}
        <h3 className="font-headline text-lg text-on-surface mb-2 line-clamp-2 group-hover:text-tertiaryGold transition-colors leading-snug">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm font-landing text-secondary-muted line-clamp-3 mb-5 flex-1 leading-relaxed">
          {preview?.description}
        </p>

        {/* Author row */}
        <div className="flex items-center justify-between pt-3.5 border-t border-outline-variant/20">
          <div className="flex items-center gap-2.5 min-w-0">
            {author?.image ? (
              <img
                src={author.image}
                alt={author.name}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-1 ring-outline-variant/30"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-tertiaryGold/15 flex items-center justify-center flex-shrink-0">
                <i className="fa-regular fa-user text-xs text-tertiaryGold" />
              </div>
            )}
            <span className="text-sm font-landing font-medium text-on-surface truncate">
              {author?.title} {author?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isPaid && price ? (
              <span className="text-xs font-landing font-semibold text-on-surface">
                {currency === 'usd' ? '$' : currency}
                {price}
              </span>
            ) : (
              <span className="text-xs font-landing font-semibold text-green-600">Free</span>
            )}
            <i className="fa-regular fa-chevron-right text-xs text-secondary-muted" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
