import { toaster } from '@lib';
import { useEffect } from 'react';
import CoursePageSkeleton from './CoursePageSkeleton';

const CoursePageError = () => {
  useEffect(() => {
    toaster.error('Error! Course data could not be loaded');
  }, []);

  return <CoursePageSkeleton backgroundColor="bg-red-300" />;
};

export default CoursePageError;
