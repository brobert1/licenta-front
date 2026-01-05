import { Link } from '@components';
import { usePreview } from '@hooks';
import { classnames } from '@lib';

const MenuLinks = () => {
  const { isPreview } = usePreview();

  return (
    <div className="hidden lg:flex gap-2">
      <div
        className={classnames('relative', isPreview ? 'opacity-50 cursor-not-allowed' : 'group')}
      >
        <div className="text-lg font-semibold px-4 py-2 text-white rounded-lg flex items-center gap-2">
          Play
          <i className="fas fa-chevron-down text-xs opacity-70"></i>
        </div>
        {!isPreview && (
          <div className="absolute top-full left-0 mt-1 w-48 p-2 bg-primary border border-tertiary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link
              href="/client/play"
              className="flex items-center rounded gap-3 px-4 py-2 text-white hover:bg-tertiary transition-colors duration-150"
            >
              <i className="fa-regular fa-robot text-sm w-4"></i>
              <span>Play vs Bot</span>
            </Link>
            <Link
              href="/client/play/history"
              className="flex items-center rounded gap-3 px-4 py-2 text-white hover:bg-tertiary transition-colors duration-150"
            >
              <i className="fa-regular fa-history text-sm w-4"></i>
              <span>Game History</span>
            </Link>
            <Link
              href="/client/play/stats"
              className="flex items-center rounded gap-3 px-4 py-2 text-white hover:bg-tertiary transition-colors duration-150"
            >
              <i className="fa-regular fa-chart-simple text-sm w-4"></i>
              <span>Game Stats</span>
            </Link>
          </div>
        )}
      </div>
      <Link
        href="/client/courses"
        className="text-lg cursor-pointer font-semibold px-4 py-2 text-white hover:bg-tertiary rounded-lg"
      >
        Courses
      </Link>
      <Link
        href="/client/studio"
        className={classnames(
          'text-lg cursor-pointer font-semibold px-4 py-2 text-white hover:bg-tertiary rounded-lg',
          isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        Study
      </Link>
    </div>
  );
};

export default MenuLinks;
