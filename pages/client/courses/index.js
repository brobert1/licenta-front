import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components/Client';
import { CoursesList } from '@components/Course';
import { useDebounce, usePreview } from '@hooks';
import { useState } from 'react';

const HeroBanner = () => (
  <div className="relative bg-black rounded-2xl overflow-hidden mb-8 px-10 py-12">
    <div className="max-w-lg">
      <span className="inline-block px-3 py-1 bg-tertiaryGold text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-5">
        Masterclass Series
      </span>
      <h1 className="font-headline text-3xl md:text-4xl text-white mb-4 leading-tight">
        The Sicilian Defense: Master the Chaos
      </h1>
      <p className="font-landing text-white/70 text-sm mb-7 leading-relaxed">
        Join GM Magnus Arvidson for a 20-hour deep dive into the most aggressive response to 1.e4.
        Learn theoretical lines and practical middlegame plans.
      </p>
      <div className="flex gap-3">
        <button className="px-5 py-2.5 bg-tertiaryGold text-white font-landing font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity">
          Start Learning
        </button>
        <button className="px-5 py-2.5 bg-transparent border border-white/30 text-white font-landing font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors">
          View Curriculum
        </button>
      </div>
    </div>
  </div>
);

const FilterSelect = ({ value, onChange, children }) => (
  <div className="relative flex-shrink-0">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none pl-4 pr-9 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-landing text-sm text-on-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-tertiaryGold/30"
    >
      {children}
    </select>
    <i className="fa-regular fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-secondary-muted text-xs pointer-events-none" />
  </div>
);

const SearchBar = ({ search, onSearchChange, difficulty, onDifficultyChange }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="flex-1 relative">
      <i className="fa-regular fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-secondary-muted text-sm" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search courses, instructors, or topics..."
        className="w-full pl-9 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-landing text-sm text-on-surface placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-tertiaryGold/30"
      />
    </div>
    <FilterSelect value="" onChange={() => {}}>
      <option value="">All Topics</option>
      <option value="openings">Openings</option>
      <option value="endgames">Endgames</option>
      <option value="strategy">Strategy</option>
      <option value="tactics">Tactics</option>
      <option value="masterclass">Masterclass</option>
    </FilterSelect>
    <FilterSelect value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
      <option value="">Difficulty</option>
      <option value="novice">Novice</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
      <option value="expert">Expert</option>
    </FilterSelect>
    <button className="flex items-center gap-2 px-4 py-2.5 bg-on-surface text-surface font-landing font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity flex-shrink-0">
      <i className="fa-regular fa-sliders" />
      More Filters
    </button>
  </div>
);

const Page = () => {
  const { isPreview } = usePreview();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const options = {};
  if (debouncedSearch.length >= 3) options.search = debouncedSearch;
  if (difficulty) options.difficulty = difficulty;

  return (
    <Layout>
      <HeroBanner />
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
      <CoursesList isPreview={isPreview} options={options} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
