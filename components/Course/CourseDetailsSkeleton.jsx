import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const CourseDetailsSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load course details');
    }
  }, [type]);

  return (
    <div className="max-w-6xl w-full grid lg:grid-cols-4 gap-6 mb-20">
      {/* Left Section */}
      <div className="lg:col-span-3 flex flex-col gap-8">
        {/* Course Thumbnail and Info */}
        <div className="flex gap-4 items-center">
          <Pill type={type} className="w-28 h-28 aspect-square rounded-lg" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-0.5 text-xs text-yellow-400">
              <Pill type={type} className="w-28 h-4 rounded-full" />
            </div>
            <Pill type={type} className="h-6 w-1/2 rounded mb-2" />
            <Pill type={type} className="h-4 w-full rounded" />
            <Pill type={type} className="h-4 w-full rounded" />
            <Pill type={type} className="h-4 w-full rounded" />
          </div>
        </div>
        {/* Lessons List */}
        <div className="flex flex-col gap-4">
          <Pill type={type} className="h-6 w-1/3 rounded" />
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-7 bg-secondary p-4 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col w-full gap-1 lg:justify-between">
                    <Pill type={type} className="h-5 w-2/3 rounded" />
                    <div className="flex items-center gap-2">
                      <Pill type={type} className="h-4 w-10 rounded" />
                      <Pill type={type} className="h-4 w-4 rounded-full bg-red-400" />
                    </div>
                  </div>
                </div>
                <Pill type={type} className="h-10 w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-4">
          <Pill type={type} className="h-6 w-1/3 rounded" />
          <div className="flex h-40 flex-col bg-secondary overflow-hidden rounded-lg p-4 gap-4">
            <div className="flex flex-col gap-2"></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-6">
        {/* Course Stats Skeleton */}
        <div className="flex flex-col bg-secondary overflow-hidden rounded-lg p-4 gap-4">
          <Pill type={type} className="h-6 w-1/2" />
          <div className="flex flex-col gap-2">
            <Pill type={type} className="h-4 w-3/4" />
            <Pill type={type} className="h-4 w-1/2" />
            <Pill type={type} className="h-4 w-2/3" />
            <Pill type={type} className="h-4 w-1/3" />
            <Pill type={type} className="h-4 w-2/3" />
          </div>
        </div>
        {/* Related Courses Skeleton */}
        <div className="flex flex-col gap-2">
          <Pill type={type} className="h-6 w-2/3" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4 bg-secondary p-2 rounded-lg">
                <Pill type={type} className="w-20 h-20 aspect-square rounded" />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex w-full flex-col gap-2">
                    <Pill type={type} className="h-4 w-full" />
                    <Pill type={type} className="h-4 w-2/3" />
                  </div>

                  <Pill type={type} className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
