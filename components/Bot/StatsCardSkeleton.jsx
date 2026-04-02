import { Pill } from '@components';

const StatsCardSkeleton = ({ type }) => {
  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Pill type={type} className="h-5 w-5 rounded" />
            <Pill type={type} className="h-6 w-32 rounded" />
          </div>
        </div>
        <div className="mb-4 text-center">
          <Pill type={type} className="mx-auto mb-1 h-9 w-16 rounded" />
        </div>
        <div className="w-full">
          <div className="relative mb-2">
            <Pill type={type} className="absolute left-0 h-4 w-12 rounded" />
            <Pill type={type} className="absolute left-1/2 h-4 w-12 -translate-x-1/2 rounded" />
            <Pill type={type} className="absolute right-0 h-4 w-12 rounded" />
          </div>
          <div className="mb-2 mt-6 h-4 w-full overflow-hidden rounded-full bg-tertiary">
            <Pill type={type} className="h-full w-full rounded-full" />
          </div>
          <div className="relative mt-2">
            <Pill type={type} className="absolute left-0 h-3 w-16 rounded" />
            <Pill type={type} className="absolute left-1/2 h-3 w-16 -translate-x-1/2 rounded" />
            <Pill type={type} className="absolute right-0 h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
