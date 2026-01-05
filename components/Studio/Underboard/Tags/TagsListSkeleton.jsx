import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const TagsListSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load tags');
    }
  }, [type]);

  return (
    <div className="flex flex-wrap gap-2">
      <Pill type={type} className="h-8 w-20 rounded-full" />
      <Pill type={type} className="h-8 w-20 rounded-full" />
      <Pill type={type} className="h-8 w-20 rounded-full" />
      <Pill type={type} className="h-8 w-20 rounded-full" />
    </div>
  );
};

export default TagsListSkeleton;
