import { classnames, toaster } from '@lib';
import { useEffect } from 'react';
import StudyCardSkeleton from './StudyCardSkeleton';
import { useProfile } from '@hooks';

const StudiesListSkeleton = ({ type }) => {
  const { me } = useProfile();
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load the studies');
    }
  }, [type]);

  return (
    <div className="col-span-2 flex flex-col gap-4">
      <div
        className={classnames(
          'grid grid-cols-1 sm:grid-cols-2 gap-6',
          me?.role === 'admin' && 'lg:grid-cols-3'
        )}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <StudyCardSkeleton key={index} type={type} />
        ))}
      </div>
    </div>
  );
};

export default StudiesListSkeleton;
