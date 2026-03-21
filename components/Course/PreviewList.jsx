import { NoDataPlaceholder } from '@components';
import { useState } from 'react';
import LessonCard from './LessonCard';

const INITIAL_SHOWN = 3;

const PreviewList = ({ content = [], user, isPreview }) => {
  const [showAll, setShowAll] = useState(false);

  const sortedContent = [...content]
    .filter((item) => item.kind === 'study')
    .sort((a, b) => a.index - b.index);

  const visible = showAll ? sortedContent : sortedContent.slice(0, INITIAL_SHOWN);

  return (
    <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6">
      <h2 className="font-headline text-xl text-on-surface mb-5">Course Curriculum</h2>

      {sortedContent.length === 0 && (
        <NoDataPlaceholder icon="fa-light fa-chess" message="No content available at the moment" />
      )}

      <div className="flex flex-col gap-3">
        {visible.map((data, i) => (
          <LessonCard
            key={data._id}
            _id={data._id}
            name={data.name}
            index={data.index ?? i}
            chapters={data.chapters}
            completedChapters={data.completedChapters}
            user={user}
            isOwned={user.isOwned}
            active={data.active}
            isPreview={isPreview}
          />
        ))}
      </div>

      {sortedContent.length > INITIAL_SHOWN && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-5 flex items-center gap-2 text-sm font-landing font-semibold text-on-surface hover:text-tertiaryGold transition-colors"
        >
          {showAll ? (
            <>
              Show less <i className="fa-regular fa-chevron-up text-xs" />
            </>
          ) : (
            <>
              View all lessons <i className="fa-regular fa-arrow-right text-xs" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default PreviewList;
