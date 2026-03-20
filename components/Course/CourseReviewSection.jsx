import { AddReviewForm } from '@components/Forms';
import ReviewCard from './ReviewCard';
import Reviews from './Reviews';

const CourseReviewSection = ({ user, course }) => (
  <div className="flex flex-col gap-5">
    <h3 className="font-headline text-xl text-on-surface">Course Reviews</h3>
    <div className="flex flex-col gap-5 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
      {user.isReviewer ? (
        <ReviewCard review={user.review} awaitReview={!user.review.approved} />
      ) : user.isOwned ? (
        <AddReviewForm course={course} />
      ) : (
        <div className="rounded-xl border border-outline-variant/20 bg-surface-container p-4">
          <p className="text-sm font-landing text-secondary-muted">
            You need to own this course in order to leave a review.
          </p>
        </div>
      )}
      <Reviews
        reviews={course.reviews}
        name={course.name}
        uuid={course._id}
        review={user.review}
      />
    </div>
  </div>
);

export default CourseReviewSection;
