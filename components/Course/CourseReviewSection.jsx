import { StarRating } from '@components';
import { AddReviewForm } from '@components/Forms';
import ReviewCard from './ReviewCard';
import Reviews from './Reviews';

const CourseReviewSection = ({ user, course, showAllReviews = false }) => {
  const hasUser = Boolean(user);
  const canLeaveReview = hasUser && user.isOwned && !user.isReviewer;
  const hasUserReview = hasUser && user.isReviewer && user.review;
  const approvedReviewsCount = (course?.reviews || []).length + (user?.review?.approved ? 1 : 0);
  const shouldShowRating = approvedReviewsCount > 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-primary">Course Reviews</h2>
      {shouldShowRating && (
        <div className="mb-4 flex items-center gap-2">
          <StarRating readOnly={true} value={parseFloat(course?.rating) || 0} />
          <span className="text-sm text-muted">
            {course?.rating} ({approvedReviewsCount}{' '}
            {approvedReviewsCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {hasUser && (
          <>
            {hasUserReview && (
              <ReviewCard awaitReview={!user.review.approved} review={user.review} />
            )}
            {!hasUserReview && canLeaveReview && <AddReviewForm course={course} />}
            {!canLeaveReview && !hasUserReview && (
              <div className="rounded-md border border-black/5 bg-black/5 p-4 text-sm text-muted">
                You need to own this course in order to leave a review.
              </div>
            )}
          </>
        )}
        <Reviews
          reviews={course.reviews || []}
          name={course.name}
          uuid={course._id}
          review={hasUserReview ? user.review : null}
          showAllReviews={showAllReviews}
        />
      </div>
    </div>
  );
};

export default CourseReviewSection;
