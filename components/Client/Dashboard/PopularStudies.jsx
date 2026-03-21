import { Link } from '@components';
import { useQuery } from '@hooks';

const ICON_COLOR_CYCLE = [
  'bg-blue-500/15 text-blue-400',
  'bg-purple-500/15 text-purple-400',
  'bg-green-500/15 text-green-400',
  'bg-orange-500/15 text-orange-400',
];

const PopularStudies = () => {
  const { data: studies, status } = useQuery('/client/studies/popular');

  const items = Array.isArray(studies) ? studies : [];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline text-xl text-on-surface flex items-center gap-2">
          <i className="fa-regular fa-book-open text-tertiaryGold" />
          Popular Studies
        </h2>
        <Link
          href="/client/studio"
          className="text-sm font-landing font-semibold text-tertiaryGold hover:underline"
        >
          Open Studio
        </Link>
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 h-28 animate-pulse"
            />
          ))}
        </div>
      )}

      {status === 'success' && items.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <i className="fa-regular fa-book-open text-3xl text-secondary-muted/40" />
          <p className="font-landing text-sm text-secondary-muted">No studies available yet</p>
        </div>
      )}

      {status === 'success' && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((study, i) => (
            <Link
              key={study._id}
              href={`/client/studio/${study._id}`}
              className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:shadow-md transition-all group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  ICON_COLOR_CYCLE[i % ICON_COLOR_CYCLE.length]
                }`}
              >
                <i className={`fa-regular ${study.icon || 'fa-book'} text-sm`} />
              </div>
              <h3 className="font-headline text-base text-on-surface mb-1 group-hover:text-tertiaryGold transition-colors line-clamp-2">
                {study.name}
              </h3>
              <p className="text-xs font-landing text-secondary-muted">
                {study.chapters?.length ?? 0} chapter{study.chapters?.length !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularStudies;
