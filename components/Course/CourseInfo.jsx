import { StarRating } from '@components';
import parse from 'html-react-parser';

const CourseInfo = ({ name, description, image, rating, sale, isOwned }) => {
  return (
    <div className="flex gap-6 flex-col">
      <div className="flex gap-4 items-start">
        <img src={image} alt="course thumbnail" className="w-28 h-28 object-cover rounded-lg" />
        <div className="flex flex-col gap-2">
          <StarRating value={rating} readOnly={true} />
          <div className="flex items-center gap-3">
            <h2 className="text-white text-2xl lg:text-xl font-semibold">{name}</h2>
          </div>
          {sale?.isActive && !isOwned && (
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-2 rounded-md bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 px-2.5 py-1 text-xs font-semibold">
                <i className="fa-solid fa-bolt" />
                Limited Time Sale
              </span>
            </div>
          )}
          <div className="prose-description mb-4 text-gray-300 text-sm lg:text-base line-clamp-9 hidden lg:block">
            {parse(description)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:hidden bg-secondary overflow-hidden rounded-lg">
        <h4 className="text-white font-semibold p-4 pb-0">Description</h4>
        <div className="prose-description text-gray-300 text-sm lg:text-base line-clamp-9 p-4">
          {parse(description)}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
