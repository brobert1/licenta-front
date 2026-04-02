import { Pill } from '@components';

const CourseCardSkeleton = ({ type }) => {
  return (
    <div className="flex lg:flex-row flex-col bg-secondary p-3.5 lg:p-5 rounded-xl gap-4">
      {/* Image Skeleton */}
      <div className="lg:block hidden w-40 aspect-square rounded-lg overflow-hidden flex-shrink-0">
        <Pill type={type} className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col justify-between gap-4 w-full">
        {/* Top Section */}
        <div className="flex flex-col gap-2">
          {/* Header */}
          <div className="flex gap-3 items-center">
            {/* Small Image for Mobile */}
            <div className="lg:hidden w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0">
              <Pill type={type} className="h-full w-full" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Pill type={type} className="h-6 w-1/2 rounded-full" />
              <div className="lg:hidden flex items-center gap-2">
                <Pill type={type} className="h-4 w-4 rounded-sm" />
                <Pill type={type} className="h-4 w-1/3 rounded" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Pill type={type} className="h-4 w-full rounded" />
            <Pill type={type} className="h-4 w-3/4 rounded" />
          </div>

          {/* Author (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2">
            <Pill type={type} className="h-4 w-4 rounded-sm" />
            <Pill type={type} className="h-4 w-1/4 rounded" />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-sm">
            <Pill type={type} className="h-4 w-16 rounded" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Pill type={type} className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
