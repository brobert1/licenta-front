import { toaster } from '@lib';
import { useEffect } from 'react';
import EditCourseFormSkeleton from './EditCourseFormSkeleton';

const EditCourseFormError = () => {
  useEffect(() => {
    toaster.error('Error! Data could not be loaded.');
  }, []);

  return <EditCourseFormSkeleton backgroundColor="bg-red-300" />;
};

export default EditCourseFormError;
