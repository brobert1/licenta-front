import { Link } from '@components';
import { slugify } from '@functions';
import { classnames } from '@lib';
import ProgressBar from './ProgressBar';

const LessonCard = ({
  _id: uuid,
  name,
  chapters,
  completedChapters,
  isOwned,
  isPreview,
  active,
}) => {
  const isLocked = isPreview ? false : !isOwned;
  const isInactive = isPreview && active === false;

  return (
    <div
      className={classnames(
        'relative flex flex-col bg-secondary p-4 rounded-lg h-full justify-between border',
        isInactive ? 'border-dashed border-gray-500 opacity-60' : 'border-white'
      )}
    >
      {isLocked && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-lock text-red-400"></i>
        </div>
      )}
      <div className={classnames('flex items-center gap-2', isLocked && 'pr-12')}
      >
        <div className="flex lg:hidden justify-center items-center border border-gray-700 bg-gradient-to-t from-blue-950 to-secondary p-4 w-12 lg:w-16 h-12 lg:h-16 rounded-lg">
          <i className="fa-solid fa-circle-play text-accent text-2xl lg:text-3xl"></i>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-white truncate flex items-center gap-2" title={name}>
              <i className="fa-solid fa-circle-play text-blue-400"></i>
              {name}
            </h5>
          </div>
        </div>
      </div>
      <div className="flex mt-4 flex-col gap-4 items-center">
        <ProgressBar
          completedCount={completedChapters}
          totalCount={chapters?.length}
          one="chapter"
          many="chapters"
        />
        {isLocked ? (
          <button
            disabled
            className="w-full py-2 text-center rounded bg-gray-800 text-gray-500 cursor-not-allowed"
          >
            Locked
          </button>
        ) : (
          <Link
            href={`/client/study/${slugify(name, uuid)}`}
            className="button full w-full accent py-1.5 text-center"
          >
            Continue
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
