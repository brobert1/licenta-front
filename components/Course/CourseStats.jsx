import { Plural } from '@components';
import { formatDate } from '@functions';

const CourseStats = ({ createdAt, difficulty, lessonsCount, hasMoveTrainer }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-secondary overflow-hidden rounded-lg">
        <h4 className="text-white font-semibold p-4 pb-0">About this course</h4>
        <div className="flex flex-col gap-2 text-white/80 text-sm p-4">
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-chess-queen w-4"></i>
            <p className="first-letter">{difficulty}</p>
          </div>
          {hasMoveTrainer && process.env.HAS_MOVE_TRAINER === 'yes' && (
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-chess-knight w-4"></i>
              <p>Move Trainer</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-graduation-cap w-4"></i>
            <p>
              <Plural count={lessonsCount} one="Lesson" many="Lessons" />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-calendar-days w-4"></i>
            <p>Released {formatDate(createdAt, 'MMM dd, yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
