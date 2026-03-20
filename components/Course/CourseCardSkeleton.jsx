const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-surface-container-high rounded ${className}`} />
);

const CourseCardSkeleton = () => (
  <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm">
    {/* Thumbnail */}
    <div className="aspect-[16/10] bg-surface-container-high animate-pulse" />

    {/* Content */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      {/* Category */}
      <Shimmer className="h-3 w-1/4" />

      {/* Title — 2 lines */}
      <div className="flex flex-col gap-2">
        <Shimmer className="h-5 w-full" />
        <Shimmer className="h-5 w-3/4" />
      </div>

      {/* Description — 3 lines */}
      <div className="flex flex-col gap-1.5 mt-1">
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3.5 w-2/3" />
      </div>

      {/* Author row */}
      <div className="flex items-center justify-between pt-3.5 border-t border-outline-variant/20 mt-auto">
        <div className="flex items-center gap-2.5">
          <Shimmer className="w-7 h-7 rounded-full flex-shrink-0" />
          <Shimmer className="h-3.5 w-28" />
        </div>
        <Shimmer className="h-3.5 w-8" />
      </div>
    </div>
  </div>
);

export default CourseCardSkeleton;
