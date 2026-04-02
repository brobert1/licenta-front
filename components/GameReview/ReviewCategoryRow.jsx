import { Bone } from '@components';
import { classnames } from '@lib';

const ReviewCategoryRow = ({
  label,
  icon,
  text,
  bgColor,
  color,
  whiteCount,
  blackCount,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-3 items-center py-3 relative">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex justify-center">
        {isLoading ? (
          <Bone type="loading" extraClass="w-6" />
        ) : (
          <span className={classnames('text-sm font-bold', color)}>{whiteCount}</span>
        )}
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <Bone type="loading" extraClass="w-6" />
        ) : (
          <span className={classnames('text-sm font-bold', color)}>{blackCount}</span>
        )}
      </div>
      <div
        className={classnames(
          'w-7 h-7 rounded-full flex items-center justify-center absolute left-2/3 -translate-x-1/2',
          bgColor
        )}
      >
        {text ? (
          <span className="text-white text-xs font-bold leading-none">{text}</span>
        ) : (
          <i className={classnames(icon, 'text-white text-xs')}></i>
        )}
      </div>
    </div>
  );
};

export default ReviewCategoryRow;
