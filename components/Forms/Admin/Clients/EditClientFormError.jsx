import { toaster } from '@lib';
import { useEffect } from 'react';
import EditClientFormSkeleton from './EditClientFormSkeleton';

const EditClientFormError = () => {
  useEffect(() => {
    toaster.error('Error! Data could not be loaded.');
  }, []);

  return <EditClientFormSkeleton backgroundColor="bg-red-300" />;
};

export default EditClientFormError;
