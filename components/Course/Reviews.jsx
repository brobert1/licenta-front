import { Link } from '@components';
import { slugify } from '@functions';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviews, uuid, name, showAllReviews, review }) => {
  const hasOwnReview = Boolean(review?._id);
  const reviewsWithoutOwn = hasOwnReview
    ? (reviews || []).filter((item) => item?._id !== review._id)
    : reviews || [];

  if (!hasOwnReview && !reviewsWithoutOwn.length) {
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
        {hasOwnReview && <ReviewCard awaitReview={!review.approved} review={review} />}
        {reviewsWithoutOwn.map((item) => (
          <ReviewCard key={item._id} review={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {reviewsWithoutOwn.slice(0, 2).map((item) => (
          <ReviewCard key={item._id} review={item} />
        ))}
      </div>
      {reviewsWithoutOwn.length > 1 && (
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
