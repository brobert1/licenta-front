import { Pill } from '@components';

const StatsCardSkeleton = ({ type }) => {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-sm border border-neutral-700 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Pill type={type} className="h-5 w-5 rounded" />
            <Pill type={type} className="h-6 w-32 rounded" />
          </div>
        </div>
        <div className="text-center mb-4">
          <Pill type={type} className="h-9 w-16 rounded mb-1 mx-auto" />
        </div>
        <div className="w-full">
          <div className="relative mb-2">
            <Pill type={type} className="h-4 w-12 rounded absolute left-0" />
            <Pill type={type} className="h-4 w-12 rounded absolute left-1/2 -translate-x-1/2" />
            <Pill type={type} className="h-4 w-12 rounded absolute right-0" />
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-4 overflow-hidden mb-2 mt-6">
            <Pill type={type} className="h-full w-full rounded-full" />
          </div>
          <div className="relative mt-2">
            <Pill type={type} className="h-3 w-16 rounded absolute left-0" />
            <Pill type={type} className="h-3 w-16 rounded absolute left-1/2 -translate-x-1/2" />
            <Pill type={type} className="h-3 w-16 rounded absolute right-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
