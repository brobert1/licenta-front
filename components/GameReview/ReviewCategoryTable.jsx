import reviewCategories from '@constants/review-categories';
import ReviewCategoryRow from './ReviewCategoryRow';

const ReviewCategoryTable = ({ whiteCounts, blackCounts, isLoading }) => {
  return (
    <div className="flex flex-col py-2 border-t border-white/10 mx-4">
      {reviewCategories.map((cat) => (
        <ReviewCategoryRow
          key={cat.key}
          label={cat.label}
          icon={cat.icon}
          text={cat.text}
          bgColor={cat.bgColor}
          color={cat.color}
          whiteCount={whiteCounts[cat.key] || 0}
          blackCount={blackCounts[cat.key] || 0}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default ReviewCategoryTable;
