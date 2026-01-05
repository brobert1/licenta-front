import { RelatedCoursesList } from '@components/Course';
import { PreviewList } from '@components/Course';
import { handlePaymentSuccess } from '@functions';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { CourseReviewSection } from '.';
import ClaimCourseButton from './ClaimCourseButton';
import CourseBottomBar from './CourseBottomBar';
import CourseInfo from './CourseInfo';
import CourseStats from './CourseStats';
import PurchaseButton from './PurchaseButton';
import Reviews from './Reviews';

const CourseDetailsSuccess = ({ data, showAllReviews, success, isPreview }) => {
  const { course, user } = data;
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    handlePaymentSuccess({ success, router, toastShownRef: toastShown });
  }, [success, router]);

  const lessonsCount = course?.content?.filter((i) => i.kind === 'study').length;

  return (
    <>
      <div className="max-w-6xl w-full grid lg:grid-cols-4 gap-6 mb-20">
        <div className="lg:col-span-3 flex flex-col gap-8">
          <CourseInfo
            _id={course._id}
            author={course.author}
            description={course.description}
            image={course.image?.path}
            name={course.name}
            user={user}
            rating={course.rating}
            sale={course.sale}
            isOwned={user?.isOwned}
          />
          <div className="lg:hidden">
            <CourseStats
              createdAt={course?.createdAt}
              difficulty={course?.difficulty}
              lessonsCount={lessonsCount}
              hasMoveTrainer={course?.hasMoveTrainer}
            />
          </div>
          {/* if showAllReviews is true, the all reviews page is displayed */}
          {showAllReviews ? (
            <Reviews reviews={course.reviews} showAllReviews={true} />
          ) : (
            <>
              <PreviewList content={course.content} user={user} isPreview={isPreview} />
              <CourseReviewSection user={user} course={course} />
            </>
          )}
        </div>
        <div className="flex-col gap-6 hidden lg:flex">
          {!course.isPaid && !user.isOwned && (
            <ClaimCourseButton course={course} isPreview={isPreview} />
          )}
          {course.isPaid && !user.isOwned && (
            <PurchaseButton course={course} isPreview={isPreview} />
          )}
          <CourseStats
            createdAt={course?.createdAt}
            difficulty={course?.difficulty}
            lessonsCount={lessonsCount}
            hasMoveTrainer={course?.hasMoveTrainer}
          />
          {course?.relatedCourses?.length > 0 && (
            <div className="flex flex-col gap-2">
              <h5 className="text-white font-medium">You may also be interested in</h5>
              <RelatedCoursesList courses={course.relatedCourses} />
            </div>
          )}
        </div>
      </div>
      <CourseBottomBar course={course} user={user} isPreview={isPreview} />
    </>
  );
};

export default CourseDetailsSuccess;
