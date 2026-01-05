import { AddReviewForm } from '@components/Forms';
import ReviewCard from './ReviewCard';
import Reviews from './Reviews';

const CourseReviewSection = ({ user, course }) => {
  return (
    <div className="flex mt-8 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-white text-lg">Course Reviews</h3>
        <div className="flex flex-col gap-4 p-6 bg-secondary rounded-lg shadow">
          {/* The user can leave a review only if they have not posted a review yet */}
          {user.isReviewer ? (
            <ReviewCard review={user.review} awaitReview={!user.review.approved} />
          ) : user.isOwned ? (
            <AddReviewForm course={course} />
          ) : (
            <div className="rounded-md border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
              You need to own this course in order to leave a review.
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
    </div>
  );
};

export default CourseReviewSection;
