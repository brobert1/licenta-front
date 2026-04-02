import { classnames, toaster } from '@lib';
import { useEffect } from 'react';

const SkeletonBlock = ({ className, type }) => (
  <div
    className={classnames(
      'rounded',
      type === 'error' ? 'bg-red-500/20' : 'bg-tertiary animate-pulse',
      className
    )}
  />
);

const GamePreviewSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load game');
    }
  }, [type]);

  return (
    <div className="w-full">
      <div className="md:hidden flex flex-col h-screen bg-secondary overflow-hidden">
        <div className="h-14 w-full bg-surface border-b border-border flex items-center px-4 justify-between shrink-0">
          <SkeletonBlock type={type} className="w-10 h-10 rounded-full" />
          <div className="flex gap-2 items-center bg-secondary rounded-full px-3 py-1.5 border border-border">
            <SkeletonBlock type={type} className="w-8 h-4 rounded" />
            <SkeletonBlock type={type} className="w-24 h-4 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-10 h-10 rounded-md" />
        </div>
        <div className="flex items-center justify-center gap-3 pt-3 px-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
            <SkeletonBlock type={type} className="w-20 h-3 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-3 h-3 rounded" />
          <div className="flex items-center gap-1.5">
            <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
            <SkeletonBlock type={type} className="w-20 h-3 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-3 h-3 rounded" />
          <SkeletonBlock type={type} className="w-16 h-3 rounded" />
        </div>
        <div className="w-full px-12 pt-3 flex-shrink-0 flex justify-center">
          <SkeletonBlock
            type={type}
            className="w-full max-w-sm aspect-square rounded-2xl border border-border/50"
          />
        </div>
        <div className="flex-1 bg-surface border-t border-border rounded-t-2xl mx-0 mt-4 flex flex-col relative overflow-hidden">
          <div
            className={classnames(
              'absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full opacity-50',
              type === 'error' ? 'bg-red-500/30' : 'bg-tertiary'
            )}
          />
          <div className="px-5 pt-8 pb-4 flex flex-col gap-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock type={type} className="w-7 h-3 rounded shrink-0 opacity-50" />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 3 === 0 ? 'w-20' : 'w-16')}
                />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 4 === 0 ? 'w-12' : 'w-16')}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 w-full px-5 pb-5 pt-3 bg-surface border-t border-border">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary border border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <SkeletonBlock type={type} className="w-28 h-11 rounded-xl" />
              <SkeletonBlock type={type} className="w-11 h-11 rounded-xl" />
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-tertiary p-1">
              <SkeletonBlock type={type} className="w-11 h-11 rounded-lg" />
              <SkeletonBlock type={type} className="w-11 h-11 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:grid 2xl:hidden grid-cols-5 gap-6 w-full">
        <div className="col-span-3 flex flex-col gap-0">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1.5">
              <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
              <SkeletonBlock type={type} className="w-24 h-3 rounded" />
            </div>
            <SkeletonBlock type={type} className="w-3 h-3 rounded" />
            <div className="flex items-center gap-1.5">
              <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
              <SkeletonBlock type={type} className="w-24 h-3 rounded" />
            </div>
            <SkeletonBlock type={type} className="w-3 h-3 rounded" />
            <SkeletonBlock type={type} className="w-20 h-3 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-full aspect-square rounded-md" />
          <div className="flex items-center justify-between gap-2 mt-2.5">
            <div className="flex gap-2">
              <SkeletonBlock type={type} className="w-36 h-8 rounded-md" />
              <SkeletonBlock type={type} className="w-20 h-8 rounded-md" />
            </div>
            <div className="flex gap-1">
              <SkeletonBlock type={type} className="w-9 h-8 rounded-md" />
              <SkeletonBlock type={type} className="w-9 h-8 rounded-md" />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col overflow-hidden rounded-md">
          <div className="flex items-center justify-between px-3 py-2 bg-tertiary border-b border-border shrink-0">
            <SkeletonBlock type={type} className="w-28 h-4 rounded" />
            <SkeletonBlock type={type} className="w-8 h-4 rounded-full" />
          </div>
          <div className="flex-1 bg-white flex flex-col overflow-hidden px-3 py-2 gap-1.5">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock type={type} className="w-7 h-3 rounded shrink-0 opacity-50" />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 3 === 0 ? 'w-20' : 'w-16')}
                />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 4 === 0 ? 'w-12' : 'w-16')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden 2xl:grid grid-cols-3 gap-3 w-full">
        <div className="col-span-2 flex flex-col gap-0">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1.5">
              <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
              <SkeletonBlock type={type} className="w-24 h-3 rounded" />
            </div>
            <SkeletonBlock type={type} className="w-3 h-3 rounded" />
            <div className="flex items-center gap-1.5">
              <SkeletonBlock type={type} className="w-2.5 h-2.5 rounded-full" />
              <SkeletonBlock type={type} className="w-24 h-3 rounded" />
            </div>
            <SkeletonBlock type={type} className="w-3 h-3 rounded" />
            <SkeletonBlock type={type} className="w-20 h-3 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-full aspect-square rounded-md" />
          <div className="flex items-center justify-between gap-2 mt-2.5">
            <div className="flex gap-2">
              <SkeletonBlock type={type} className="w-36 h-8 rounded-md" />
              <SkeletonBlock type={type} className="w-20 h-8 rounded-md" />
            </div>
            <div className="flex gap-1">
              <SkeletonBlock type={type} className="w-9 h-8 rounded-md" />
              <SkeletonBlock type={type} className="w-9 h-8 rounded-md" />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col overflow-hidden rounded-md">
          <div className="flex items-center justify-between px-3 py-2 bg-tertiary border-b border-border shrink-0">
            <SkeletonBlock type={type} className="w-28 h-4 rounded" />
            <SkeletonBlock type={type} className="w-8 h-4 rounded-full" />
          </div>
          <div className="flex-1 bg-white flex flex-col overflow-hidden px-3 py-2 gap-1.5">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock type={type} className="w-7 h-3 rounded shrink-0 opacity-50" />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 3 === 0 ? 'w-20' : 'w-16')}
                />
                <SkeletonBlock
                  type={type}
                  className={classnames('h-3 rounded', i % 4 === 0 ? 'w-12' : 'w-16')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePreviewSkeleton;
