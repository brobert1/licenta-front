import { Link, StarRating } from '@components';
import { slugify } from '@functions';
import ReviewCard from './ReviewCard';

const CourseReviewsCard = ({ course, maxDisplay = 2, reviews = [], user }) => {
  const seeAllHref = user
    ? `/client/course-reviews/${slugify(course?.name, course?._id)}`
    : '/signup';

  const allReviews = (reviews || []).filter(Boolean);
  const userReviewId = user?.review?._id;

  const reviewsList = allReviews
    .filter((review) => review.approved && review._id !== userReviewId)
    .filter(Boolean);

  const totalCount = reviewsList.length;
  const visibleReviews = reviewsList.slice(0, maxDisplay);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-primary">Course Reviews</h2>
      <div className="flex flex-col gap-4">
        {totalCount > 0 && (
          <div className="mb-2 flex items-center gap-2">
            <StarRating readOnly={true} value={parseFloat(course?.rating) || 0} />
            <span className="text-sm text-muted">
              {course?.rating} ({totalCount} {totalCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
        {totalCount === 0 && (
          <p className="py-4 text-center text-muted">No reviews have been posted yet.</p>
        )}
        {totalCount > 0 && (
          <>
            <div className="flex flex-col gap-4">
              {visibleReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
            {totalCount > maxDisplay && (
              <Link
                className="block w-full py-2 text-center text-sm font-medium text-interactive hover:underline"
                href={seeAllHref}
              >
                {user
                  ? `See all ${totalCount} reviews`
                  : `Sign up to see all ${totalCount} reviews`}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseReviewsCard;
