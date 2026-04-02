import { isEmpty } from 'lodash';
import CourseContentLessonRow from './CourseContentLessonRow';

const CourseContentCard = ({ content, locked = false, user, isPreview = false }) => {
  const lessons = (content || [])
    .filter((item) => item.kind === 'study' && !isEmpty(item.chapters))
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const isOwned = (user?.isOwned || isPreview) && !locked;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-primary">Course Content</h2>
      <div className="flex flex-col divide-y divide-tertiary">
        {lessons.map((lesson, i) => (
          <div key={lesson._id || i}>
            <CourseContentLessonRow
              isOwned={isOwned}
              lesson={lesson}
              locked={locked}
              isPreview={isPreview}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentCard;
