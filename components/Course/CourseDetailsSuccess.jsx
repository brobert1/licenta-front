import CourseAboutCard from '@components/Course/CourseAboutCard';
import CourseContentCard from '@components/Course/CourseContentCard';
import CourseDetailsSkeleton from '@components/Course/CourseDetailsSkeleton';
import CourseEnrollmentCard from '@components/Course/CourseEnrollmentCard';
import CourseHeaderCard from '@components/Course/CourseHeaderCard';
import CourseReviewSection from '@components/Course/CourseReviewSection';
import CourseStatsCard from '@components/Course/CourseStatsCard';
import Reviews from '@components/Course/Reviews';
import { handlePaymentSuccess } from '@functions';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const CourseDetailsSuccess = ({ data, showAllReviews, success, isPreview }) => {
  const { course, user } = data;
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    handlePaymentSuccess({ success, router, toastShownRef: toastShown });
  }, [success, router]);

  if (!course) {
    return <CourseDetailsSkeleton type="loading" />;
  }

  const content = course.content || [];
  const lessons = content.filter((item) => item.kind === 'study');
  const lessonsCount = lessons.length;

  if (showAllReviews) {
    return (
      <div className="grid gap-6 pb-8 lg:grid-cols-3 lg:pb-10 min-w-0">
        <div className="order-1 lg:col-span-2 lg:col-start-1 min-w-0">
          <CourseHeaderCard course={course} user={user} />
        </div>
        <div className="order-2 lg:col-start-3 lg:row-start-1 lg:row-span-2 min-w-0">
          <CourseStatsCard course={course} lessonsCount={lessonsCount} />
        </div>
        <div className="order-3 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2 lg:col-start-1 min-w-0">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Course Reviews</h2>
            <p className="mt-1 text-sm text-muted">
              See what students say about{' '}
              <span className="font-bold break-words">{course.name}</span>
            </p>
          </div>
          <Reviews
            name={course.name}
            reviews={course.reviews || []}
            review={user?.review}
            showAllReviews={true}
            uuid={course._id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 pb-8 lg:grid-cols-3 lg:pb-10 min-w-0">
      <div className="flex flex-col gap-6 lg:col-span-2 min-w-0">
        <CourseHeaderCard course={course} user={user} />
        <CourseAboutCard course={course} />
        <div className="lg:hidden">
          <CourseStatsCard course={course} lessonsCount={lessonsCount} />
        </div>
        <CourseContentCard
          content={content}
          locked={!user?.isOwned && !isPreview}
          user={user}
          isPreview={isPreview}
        />
        <CourseReviewSection course={course} user={user} />
      </div>
      <div className="flex flex-col gap-6 min-w-0">
        <CourseEnrollmentCard course={course} user={user} isPreview={isPreview} />
        <div className="hidden lg:block">
          <CourseStatsCard course={course} lessonsCount={lessonsCount} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSuccess;
