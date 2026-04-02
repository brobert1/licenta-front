import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const GameViewerSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') toaster.error('Error! Unable to load game');
  }, [type]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <Pill type={type} className="h-9 w-80 rounded mb-3" />
        <div className="flex items-center gap-3">
          <Pill type={type} className="h-6 w-24 rounded-full" />
          <Pill type={type} className="h-5 w-20 rounded" />
          <Pill type={type} className="h-5 w-52 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 w-full gap-6">
        <div className="lg:col-span-3">
          <Pill type={type} className="w-full aspect-square rounded-xl" />
          <div className="lg:hidden flex gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Pill key={i} type={type} className="h-12 flex-1 rounded-md" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-md overflow-hidden bg-secondary">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="grid grid-cols-3 items-center mb-3">
              <div />
              <Pill type={type} className="h-4 w-full rounded" />
              <Pill type={type} className="h-4 w-full rounded" />
            </div>
            <div className="grid grid-cols-3 items-center">
              <Pill type={type} className="h-4 w-14 rounded" />
              <div className="flex justify-center">
                <Pill type={type} className="w-14 h-14 rounded" />
              </div>
              <div className="flex justify-center">
                <Pill type={type} className="w-14 h-14 rounded" />
              </div>
            </div>
          </div>
          <div className="p-3 space-y-2.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <Pill type={type} className="h-4 rounded" />
                <Pill type={type} className={`h-4 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 pt-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Pill key={i} type={type} className="h-12 flex-1 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameViewerSkeleton;
