import { Button, Link } from '@components';
import { slugify } from '@functions';
import Chapter from './Chapter';

const Chapters = ({
  chapters,
  activeIndex,
  onChapterClick,
  nextLesson,
  lessonId,
  onNextChapter,
  completedChapters = [],
}) => {
  return (
    <div className="bg-surface rounded-md border border-border w-full h-full flex flex-col overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-3 py-3 bg-secondary border-b border-border shrink-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-surface border border-border text-base leading-none">
          <i className="fas fa-book"></i>
        </div>
        <p className="font-semibold text-sm text-primary tracking-wide">Chapters</p>
      </div>
      <div className="flex flex-col overflow-y-auto flex-1 min-h-0 divide-y divide-border">
        {chapters?.map((chapter) => (
          <Chapter
            key={chapter._id}
            {...chapter}
            isActive={activeIndex === chapter.index}
            isCompleted={completedChapters.includes(chapter._id)}
            onChapterClick={onChapterClick}
            lessonId={lessonId}
          />
        ))}
      </div>
      {nextLesson ? (
        <Link
          className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent py-2.5 text-sm font-medium shrink-0"
          href={`/client/study/${slugify(nextLesson.name, nextLesson._id)}`}
        >
          Go to next lesson
          <i className="fa-solid fa-book"></i>
        </Link>
      ) : (
        <Button
          className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent py-2.5 text-sm font-medium shrink-0"
          onClick={onNextChapter}
        >
          Next chapter
          <i className="fa-solid fa-forward-fast"></i>
        </Button>
      )}
    </div>
  );
};

export default Chapters;
