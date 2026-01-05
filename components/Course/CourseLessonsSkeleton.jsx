import { toaster } from '@lib';
import { useEffect } from 'react';
import StudyCardSkeleton from '@components/Studio/StudyCardSkeleton';

const CourseLessonsSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load course studies');
    }
  }, [type]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <StudyCardSkeleton key={index} type={type} />
      ))}
    </div>
  );
};

export default CourseLessonsSkeleton;
