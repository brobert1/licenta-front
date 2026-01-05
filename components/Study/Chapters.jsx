import { Button, Link } from '@components';
import { classnames } from '@lib';
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
    <div className={classnames('bg-secondary rounded-t-md w-full h-full flex flex-col')}>
      <div className="bg-tertiary text-white rounded-t-md">
        <div className="flex gap-2 text-white font-semibold border-b p-2.5 border-white/10">
          <p>🚀</p>
          <p>Chapters</p>
        </div>
      </div>

      <div
        className={classnames(
          'flex flex-col gap-1 p-2 text-gray-300 overflow-y-auto flex-1 min-h-0'
        )}
      >
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
          className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
          href={`/client/study/${slugify(nextLesson.name, nextLesson._id)}`}
        >
          Go to next lesson
          <i className="fa-solid fa-book"></i>
        </Link>
      ) : (
        <Button
          className="flex gap-2 items-center w-full text-white justify-center cursor-pointer bg-accent p-2 rounded-b-md"
          onClick={onNextChapter}
        >
          Next chapter
          <i className="fa-solid fa-forward mt-1"></i>
        </Button>
      )}
    </div>
  );
};

export default Chapters;
