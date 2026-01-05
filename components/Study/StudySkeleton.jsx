import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const StudySkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load lesson details');
    }
  }, [type]);

  return (
    <div className="w-full outline-none">
      <div className="md:hidden w-full">
        <div className="bg-primary sticky z-100 top-0 py-2 -mt-8 mb-1">
          <div className="w-5/6 mx-auto">
            <Pill type={type} className="w-full aspect-square rounded-md" />
          </div>
        </div>
        <div className="flex border-b border-tertiary mb-4">
          <Pill type={type} className="h-8 w-20 mx-2 rounded-t-md" />
          <Pill type={type} className="h-8 w-20 mx-2 rounded-t-md" />
          <Pill type={type} className="h-8 w-20 mx-2 rounded-t-md" />
        </div>
        <div className="px-2">
          <Pill type={type} className="h-6 w-3/4 rounded mb-4" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Pill key={i} type={type} className="h-4 w-full rounded mb-2" />
          ))}
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-tertiary py-3 px-4 flex justify-between">
          <div className="flex gap-3">
            <Pill type={type} className="h-8 w-8 rounded-full" />
            <Pill type={type} className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Pill type={type} className="h-8 w-8 rounded-full" />
            <Pill type={type} className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div className="hidden md:grid 2xl:hidden grid-cols-5 w-full mt-4 gap-6">
        <div className="col-span-3">
          <Pill type={type} className="h-8 w-3/4 rounded mb-4" />
          <Pill type={type} className="w-full aspect-square rounded-xl" />
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <Pill type={type} className="h-10 w-10 rounded-full" />
              <Pill type={type} className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex gap-3">
              <Pill type={type} className="h-10 w-10 rounded-full" />
              <Pill type={type} className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex justify-end gap-4 mb-1">
            <Pill type={type} className="h-8 w-20 rounded" />
            <Pill type={type} className="h-8 w-20 rounded" />
          </div>
          <div className="bg-tertiary rounded-t-md">
            <Pill type={type} className="h-10 w-3/4 rounded m-2.5" />
          </div>
          <div className="flex-1 bg-secondary/30 rounded-b-md p-4 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <Pill key={i} type={type} className="h-4 w-full rounded mb-2" />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden 2xl:block p-6">
        <div className="grid grid-cols-4 outline-none w-full mt-4 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <Pill type={type} className="w-full aspect-video rounded-md" />
            <div className="flex flex-col flex-grow bg-secondary rounded-md p-3 gap-2 overflow-hidden">
              <Pill type={type} className="h-6 w-3/4 rounded mb-3" />
              {Array.from({ length: 8 }).map((_, i) => (
                <Pill key={i} type={type} className="h-5 w-full rounded" />
              ))}
              <Pill type={type} className="h-8 w-full rounded mt-auto" />
            </div>
          </div>
          <div className="col-span-2">
            <Pill type={type} className="w-full aspect-square rounded-md" />
            <div className="flex justify-between mt-4">
              <div className="flex gap-3">
                <Pill type={type} className="h-10 w-10 rounded-full" />
                <Pill type={type} className="h-10 w-10 rounded-full" />
              </div>
              <Pill type={type} className="h-10 w-20 rounded-md" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col rounded-md bg-secondary overflow-hidden">
            <div className="bg-tertiary">
              <Pill type={type} className="h-6 w-5/6 rounded m-2.5" />
            </div>
            <div className="flex flex-col flex-grow min-h-0 p-3 overflow-hidden">
              <div className="overflow-y-auto min-h-0 flex-grow space-y-2">
                <Pill type={type} className="h-4 w-1/2 rounded" />
                <Pill type={type} className="h-4 w-3/4 rounded" />
                <Pill type={type} className="h-4 w-1/2 rounded ml-4" />
                <Pill type={type} className="h-4 w-5/6 rounded" />
                <Pill type={type} className="h-4 w-1/2 rounded" />
                <Pill type={type} className="h-4 w-3/4 rounded" />
                <Pill type={type} className="h-4 w-full rounded" />
                <Pill type={type} className="h-4 w-1/2 rounded" />
                <Pill type={type} className="h-4 w-3/4 rounded ml-4" />
                <Pill type={type} className="h-4 w-5/6 rounded" />
              </div>
              <Pill type={type} className="h-10 w-full rounded mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySkeleton;
