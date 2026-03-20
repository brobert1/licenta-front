import { Link } from '@components';

const HARDCODED_STUDIES = [
  { name: "Mastering the Sicilian Defence", progress: 80 },
  { name: "Endgame Patterns: Rooks", progress: 40 },
  { name: "Magnus's Intuition", progress: 15 },
];

const InProgressStudies = () => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-headline text-xl text-on-surface">In-Progress Studies</h2>
      <Link
        href="/client/courses"
        className="text-sm font-landing font-semibold text-tertiaryGold hover:underline"
      >
        View All
      </Link>
    </div>
    <div className="flex flex-col gap-5">
      {HARDCODED_STUDIES.map((study, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-landing font-medium text-on-surface">{study.name}</span>
            <span className="text-sm font-landing text-secondary-muted">{study.progress}%</span>
          </div>
          <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-tertiaryGold rounded-full transition-all"
              style={{ width: `${study.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default InProgressStudies;
