import { Link } from '@components';

const HARDCODED_POPULAR = [
  { title: 'The London System Deep Dive', author: 'GM Simon Williams', tag: 'Trending' },
  { title: 'Rook Endgames 101', author: 'Master Academy', tag: 'New' },
  { title: 'The Semi-Slav Structure', author: 'GM Kasparov', tag: 'Advanced' },
  { title: 'Deflection & Decoying', author: 'Polgar Methods', tag: 'Tactics' },
];

const PopularStudies = () => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-headline text-xl text-on-surface flex items-center gap-2">
        <i className="fa-regular fa-book-open text-tertiaryGold" />
        Popular Studies
      </h2>
      <Link
        href="/client/courses"
        className="text-sm font-landing font-semibold text-tertiaryGold hover:underline"
      >
        Browse Library
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {HARDCODED_POPULAR.map((study, i) => (
        <Link
          key={i}
          href="/client/courses"
          className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:shadow-md transition-all group"
        >
          <span className="inline-block px-2 py-0.5 bg-tertiaryGold/10 text-tertiaryGold text-xs font-bold rounded mb-3">
            {study.tag}
          </span>
          <h3 className="font-headline text-lg text-on-surface mb-1 group-hover:text-tertiaryGold transition-colors">
            {study.title}
          </h3>
          <p className="text-sm font-landing text-secondary-muted flex items-center gap-1">
            <i className="fa-regular fa-user text-xs" />
            {study.author}
          </p>
        </Link>
      ))}
    </div>
  </section>
);

export default PopularStudies;
