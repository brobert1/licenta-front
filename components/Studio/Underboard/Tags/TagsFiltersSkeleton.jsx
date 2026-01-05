import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const TagsFiltersSkeleton = ({ type, isMobile = false }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load tags');
    }
  }, [type]);

  if (isMobile) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
        <Pill type={type} className="h-8 w-16 rounded-full flex-shrink-0" />
        <Pill type={type} className="h-8 w-20 rounded-full flex-shrink-0" />
        <Pill type={type} className="h-8 w-24 rounded-full flex-shrink-0" />
        <Pill type={type} className="h-8 w-16 rounded-full flex-shrink-0" />
        <Pill type={type} className="h-8 w-18 rounded-full flex-shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Pill type={type} className="h-4 w-16 rounded" />
      <Pill type={type} className="h-4 w-16 rounded" />
      <Pill type={type} className="h-4 w-16 rounded" />
      <Pill type={type} className="h-4 w-16 rounded" />
    </div>
  );
};

export default TagsFiltersSkeleton;
