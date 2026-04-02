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

const StudySkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load lesson details');
    }
  }, [type]);

  return (
    <div className="w-full h-screen bg-secondary overflow-hidden flex flex-col">
      <div className="md:hidden flex flex-col h-full w-full">
        <div className="h-14 w-full bg-surface border-b border-border flex items-center px-4 justify-between shrink-0 z-20">
          <SkeletonBlock type={type} className="w-10 h-10 rounded-full" />
          <div className="flex gap-2 items-center bg-secondary rounded-full px-3 py-1.5 border border-border">
            <SkeletonBlock type={type} className="w-8 h-4 rounded" />
            <SkeletonBlock type={type} className="w-24 h-4 rounded" />
          </div>
          <SkeletonBlock type={type} className="w-10 h-10 rounded-md" />
        </div>
        <div className="w-full p-6 flex justify-center shrink-0">
          <SkeletonBlock
            type={type}
            className="w-full max-w-[340px] aspect-square rounded-xl shadow-sm border border-border/50"
          />
        </div>
        <div className="flex-1 bg-surface border-t border-border rounded-t-3xl mx-0 p-6 flex flex-col relative -mt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div
            className={classnames(
              'absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full opacity-50',
              type === 'error' ? 'bg-red-500/30' : 'bg-tertiary'
            )}
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4 opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <SkeletonBlock
                  type={type}
                  className="w-4 h-4 rounded bg-border"
                  style={{ backgroundColor: type === 'error' ? undefined : 'currentColor' }}
                />
                <SkeletonBlock
                  type={type}
                  className="flex-1 h-3 rounded bg-border"
                  style={{ backgroundColor: type === 'error' ? undefined : 'currentColor' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="h-20 bg-surface border-t border-border flex items-center justify-between px-8 shrink-0 pb-4">
          <div className="flex gap-4">
            <SkeletonBlock type={type} className="w-12 h-12 rounded-full" />
            <SkeletonBlock type={type} className="w-12 h-12 rounded-full" />
          </div>
          <SkeletonBlock type={type} className="w-32 h-12 rounded-full" />
        </div>
      </div>
      <div className="hidden md:grid 2xl:hidden grid-cols-5 gap-6 w-full p-4 lg:p-6">
        <div className="col-span-3 flex flex-col gap-0">
          <SkeletonBlock type={type} className="w-56 h-6 rounded mb-2" />
          <SkeletonBlock type={type} className="w-full aspect-square rounded-md" />
          <div className="flex items-center justify-center gap-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <SkeletonBlock key={i} type={type} className="w-10 h-10 rounded-md" />
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col overflow-hidden min-h-0">
          <div className="flex justify-end gap-2 mb-1">
            <SkeletonBlock type={type} className="w-14 h-8 rounded-full" />
            <SkeletonBlock type={type} className="w-20 h-8 rounded-full" />
          </div>
          <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary border border-border">
            <div className="flex items-center justify-between px-3 py-2 bg-tertiary border-b border-border shrink-0">
              <SkeletonBlock type={type} className="w-28 h-4 rounded" />
              <div className="flex items-center gap-2">
                <SkeletonBlock type={type} className="w-8 h-4 rounded-full" />
                <SkeletonBlock type={type} className="w-7 h-7 rounded" />
              </div>
            </div>
            <div className="flex-1 bg-secondary flex flex-col overflow-hidden px-3 py-2 gap-1.5">
              {[...Array(14)].map((_, i) => (
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
            <SkeletonBlock type={type} className="w-full h-11 rounded-none shrink-0" />
          </div>
        </div>
      </div>
      <div className="hidden 2xl:grid grid-cols-4 gap-3 w-full p-4 lg:p-6">
        <div className="col-span-1 flex flex-col gap-4 overflow-hidden">
          <SkeletonBlock type={type} className="w-full aspect-video rounded-md" />
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-md border border-border">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-tertiary border-b border-border shrink-0">
              <SkeletonBlock type={type} className="w-4 h-4 rounded-full shrink-0" />
              <SkeletonBlock type={type} className="w-20 h-3.5 rounded" />
            </div>
            <div className="flex flex-col divide-y divide-border overflow-hidden flex-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 shrink-0">
                  <SkeletonBlock type={type} className="w-5 h-5 rounded-full shrink-0" />
                  <SkeletonBlock type={type} className="flex-1 h-3 rounded" />
                </div>
              ))}
            </div>
            <SkeletonBlock type={type} className="w-full h-11 rounded-none mt-auto shrink-0" />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-0">
          <SkeletonBlock type={type} className="w-full aspect-square rounded-md" />
          <div className="flex items-center justify-center gap-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <SkeletonBlock key={i} type={type} className="w-10 h-10 rounded-md" />
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col overflow-hidden rounded-md">
          <div className="flex items-center justify-between px-3 py-2 bg-tertiary border-b border-border shrink-0">
            <SkeletonBlock type={type} className="w-28 h-4 rounded" />
            <div className="flex items-center gap-2">
              <SkeletonBlock type={type} className="w-8 h-4 rounded-full" />
              <SkeletonBlock type={type} className="w-7 h-7 rounded" />
            </div>
          </div>
          <div className="flex-1 bg-secondary flex flex-col overflow-hidden px-3 py-2 gap-1.5">
            {[...Array(14)].map((_, i) => (
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
          <SkeletonBlock type={type} className="w-full h-11 rounded-none shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default StudySkeleton;
