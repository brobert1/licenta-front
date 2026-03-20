import { toaster } from '@lib';
import { useEffect } from 'react';

const S = ({ className }) => (
  <div className={`animate-pulse bg-surface-container-high rounded ${className}`} />
);

const CourseDetailsSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') toaster.error('Error! Unable to load course details');
  }, [type]);

  return (
    <div className="w-full mb-20">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-10 mb-14 items-center">
        <div className="flex flex-col gap-5">
          <S className="h-3 w-32" />
          <div className="flex flex-col gap-2">
            <S className="h-9 w-full" />
            <S className="h-9 w-3/4" />
          </div>
          <div className="flex flex-col gap-2">
            <S className="h-4 w-full" />
            <S className="h-4 w-full" />
            <S className="h-4 w-2/3" />
          </div>
          <div className="flex items-center gap-4">
            <S className="h-4 w-24" />
            <S className="h-4 w-20" />
            <S className="h-4 w-28" />
          </div>
          <div className="flex gap-3">
            <S className="h-11 w-36 rounded-xl" />
            <S className="h-11 w-36 rounded-xl" />
          </div>
        </div>
        <S className="aspect-video w-full rounded-2xl" />
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* Curriculum */}
          <div>
            <S className="h-6 w-48 mb-5" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-5 rounded-xl border border-outline-variant/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <S className="h-3 w-20" />
                    <S className="h-3 w-16" />
                  </div>
                  <S className="h-5 w-3/4" />
                  <S className="h-2 w-full rounded-full" />
                  <S className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Author card */}
          <S className="h-48 w-full rounded-2xl" />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="p-5 rounded-2xl border border-outline-variant/20 flex flex-col gap-3">
            <S className="h-5 w-32 mb-1" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <S className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <S className="h-4 flex-1" />
              </div>
            ))}
          </div>
          <S className="h-40 w-full rounded-2xl" />
          <S className="h-44 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
