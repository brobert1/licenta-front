import { Link } from '@components';
import { slugify } from '@functions';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviews, uuid, name, showAllReviews, review }) => {
  if (reviews.length <= 0) {
    return (
      <p className="text-center text-gray-500">
        {review ? 'No other reviews have been posted yet.' : 'No reviews have been posted yet.'}
      </p>
    );
  }

  // Returns all reviews page
  if (showAllReviews) {
    return (
      <div className="mt-6 space-y-6">
        {reviews.map((review,) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="space-y-6">
          {reviews.slice(0, 2).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
      {reviews.length > 1 && (
        <Link
          href={`/client/course-reviews/${slugify(name, uuid)}`}
          className="button full mx-auto accent text-xs"
        >
          See more
        </Link>
      )}
    </>
  );
};

export default Reviews;
