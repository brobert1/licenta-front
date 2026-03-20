import { CourseCardSkeleton } from '@components/Course';
import { toaster } from '@lib';
import { useEffect } from 'react';

const CoursesListSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load the courses');
    }
  }, [type]);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CoursesListSkeleton;
