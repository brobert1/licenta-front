import { Plural } from '@components';
import { formatDate } from '@functions';

const CourseStatsCard = ({ course, lessonsCount }) => {
  const count = lessonsCount ?? course?.content?.length ?? 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-primary">Course Details</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-muted">
          <i className="fa-regular fa-graduation-cap w-5 text-center text-grey" />
          <span>
            <Plural count={count} many="lessons" one="lesson" />
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <i className="fa-regular fa-signal-bars w-5 text-center text-grey" />
          <span className="capitalize">{course.difficulty || 'All levels'}</span>
        </div>
        {course.createdAt && (
          <div className="flex items-center gap-3 text-muted">
            <i className="fa-regular fa-calendar-days w-5 text-center text-grey" />
            <span>Released {formatDate(course.createdAt, 'MMM dd, yyyy')}</span>
          </div>
        )}
        {course.hasMoveTrainer && (
          <div className="flex items-center gap-3 text-muted">
            <i className="fa-regular fa-dumbbell w-5 text-center text-grey" />
            <span>Includes Move Trainer</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseStatsCard;
