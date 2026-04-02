import CourseCardSkeleton from './CourseCardSkeleton';
import { toaster } from '@lib';
import { useEffect } from 'react';

const CoursesListSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load the courses');
    }
  }, [type]);

  return (
    <div className="col-span-2 flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <CourseCardSkeleton key={index} type={type} />
      ))}
    </div>
  );
};

export default CoursesListSkeleton;
