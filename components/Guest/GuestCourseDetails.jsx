import CourseAboutCard from '@components/Course/CourseAboutCard';
import CourseContentCard from '@components/Course/CourseContentCard';
import CourseDetailsSkeleton from '@components/Course/CourseDetailsSkeleton';
import CourseEnrollmentCard from '@components/Course/CourseEnrollmentCard';
import CourseHeaderCard from '@components/Course/CourseHeaderCard';
import CourseReviewsCard from '@components/Course/CourseReviewsCard';
import CourseStatsCard from '@components/Course/CourseStatsCard';
import { useQuery } from '@hooks';

const GuestCourseDetails = ({ id }) => {
  const { data, status } = useQuery(`/public/courses/${id}`);

  if (status === 'loading') {
    return <CourseDetailsSkeleton type="loading" />;
  }
  if (status === 'error') {
    return <CourseDetailsSkeleton type="error" />;
  }

  const course = data.course;
  const content = course.content || [];
  const reviews = course.reviews || [];
  const lessons = content.filter((item) => item.kind === 'study');

  return (
    <div className="grid gap-8 pb-8 lg:grid-cols-3 lg:pb-10">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <CourseHeaderCard course={course} />
        <CourseAboutCard course={course} />
        <div className="lg:hidden">
          <CourseStatsCard lessonsCount={lessons.length} course={course} />
        </div>
        <CourseContentCard content={content} locked />
        <CourseReviewsCard course={course} maxDisplay={2} reviews={reviews} />
      </div>
      <div className="flex flex-col gap-6">
        <CourseEnrollmentCard course={course} />
        <div className="hidden lg:block">
          <CourseStatsCard lessonsCount={lessons.length} course={course} />
        </div>
      </div>
    </div>
  );
};

export default GuestCourseDetails;
