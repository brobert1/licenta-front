import { Link, Plural } from '@components';
import { slugify } from '@functions';
import { size } from 'lodash';
import CourseContentProgress from './CourseContentProgress';

const CourseContentLessonRow = ({ isOwned, lesson, locked, isPreview = false }) => {
  const chaptersCount = lesson.chaptersCount ?? size(lesson.chapters);
  const completedChapters = lesson.completedChapters ?? 0;
  const lessonHref = `/client/study/${slugify(lesson.name, lesson._id)}`;
  const isUnpublished = isPreview && lesson.active === false;

  const rowContent = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
          <i className="fa-regular fa-book text-muted" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-primary">{lesson.name}</p>
            {isUnpublished && (
              <span className="shrink-0 rounded-full bg-tertiary px-2 py-0.5 text-xs font-medium text-muted">
                Draft
              </span>
            )}
          </div>
          <p className="text-sm text-muted">
            <Plural count={chaptersCount} many="chapters" one="chapter" />
          </p>
        </div>
      </div>
      {locked ? (
        <i className="fa-solid fa-lock flex-shrink-0 text-tertiary" />
      ) : isOwned ? (
        <CourseContentProgress completedCount={completedChapters} totalCount={chaptersCount} />
      ) : null}
    </>
  );

  if (isOwned) {
    return (
      <Link
        className="-mx-6 flex cursor-pointer items-center justify-between gap-4 rounded-lg px-6 py-3 transition-colors hover:bg-secondary"
        href={lessonHref}
      >
        {rowContent}
      </Link>
    );
  }
  return <div className="flex items-center justify-between gap-4 py-3">{rowContent}</div>;
};

export default CourseContentLessonRow;
