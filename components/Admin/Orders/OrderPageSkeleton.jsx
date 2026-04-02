const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse rounded bg-tertiary ${className}`} />
);

const OrderPageSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <SkeletonBlock className="h-8 w-32" />
      <SkeletonBlock className="h-8 w-24" />
    </div>
    <div className="bg-surface border border-border p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4">
      <SkeletonBlock className="h-5 w-36" />
      <div className="flex gap-4">
        <SkeletonBlock className="h-20 w-20 flex-shrink-0 rounded-lg" />
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonBlock className="h-5 w-48" />
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="bg-surface border border-border p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4"
        >
          <SkeletonBlock className="h-5 w-40" />
          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="flex justify-between">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrderPageSkeleton;
