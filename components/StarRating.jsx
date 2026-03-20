import { classnames } from '@lib';
import { useState } from 'react';

const StarRating = ({ value = 0, onChange, totalStars = 5, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating) => {
    if (!readOnly && onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      {!readOnly && <span className="text-black">Rating</span>}
      <div className="flex items-center">
        {/* generate the stars here */}
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <i
              key={index}
              className={classnames(
                'text-2xl transition-colors',
                readOnly ? 'cursor-auto text-sm' : 'cursor-pointer',
                starValue <= (hover || value)
                  ? 'fas fa-star text-yellow-400'
                  : 'far fa-star text-gray-300'
              )}
              onClick={() => !readOnly && handleRatingChange(starValue)}
              onMouseEnter={() => !readOnly && setHover(starValue)}
              onMouseLeave={() => !readOnly && setHover(0)}
              role={readOnly ? 'img' : 'button'}
              tabIndex={readOnly ? -1 : 0}
            ></i>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
