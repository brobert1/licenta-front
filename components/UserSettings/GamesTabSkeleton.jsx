import { Bone } from '@components';

const GamesTabSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
        <div className="flex-1">
          <Bone type="loading" extraClass="mb-1 h-3 w-16 rounded" />
          <Bone type="loading" extraClass="h-10 w-full rounded" />
        </div>
        <div className="min-w-40">
          <Bone type="loading" extraClass="mb-1 h-3 w-12 rounded" />
          <Bone type="loading" extraClass="h-10 w-full rounded" />
        </div>
        <div className="min-w-40">
          <Bone type="loading" extraClass="mb-1 h-3 w-12 rounded" />
          <Bone type="loading" extraClass="h-10 w-full rounded" />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="border-b border-border bg-white px-4 py-3">
          <Bone type="loading" extraClass="h-6 w-36 rounded" />
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Bone type="loading" extraClass="h-4 w-6 shrink-0 rounded" />
              <Bone type="loading" extraClass="h-10 w-10 shrink-0 rounded-md" />
              <Bone type="loading" extraClass="h-4 min-w-0 flex-1 rounded" />
              <Bone type="loading" extraClass="h-4 w-4 shrink-0 rounded" />
              <Bone type="loading" extraClass="h-9 w-9 shrink-0 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesTabSkeleton;
