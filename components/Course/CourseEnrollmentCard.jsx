import ClaimCourseButton from './ClaimCourseButton';
import PurchaseButton from './PurchaseButton';

const CourseEnrollmentCard = ({ course, user, isPreview = false }) => {
  if (user?.isOwned) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="mt-2">
          {course.isPaid ? (
            <PurchaseButton course={course} isPreview={isPreview} />
          ) : (
            <ClaimCourseButton course={course} isPreview={isPreview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentCard;
