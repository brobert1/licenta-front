import { Pill } from '@components';
import { toaster } from '@lib';
import { useEffect } from 'react';

const CourseDetailsSkeleton = ({ type }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load course details');
    }
  }, [type]);

  const isError = type === 'error';

  const Card = ({ children, className = '' }) => (
    <div
      className={
        isError
          ? `rounded-2xl border border-red-200 bg-red-50/50 p-6 ${className}`
          : `rounded-2xl bg-white p-6 shadow-sm ${className}`
      }
    >
      {children}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <div className="flex flex-col gap-6 lg:flex-row">
            <Pill type={type} className="aspect-square w-full flex-shrink-0 rounded-xl lg:w-48" />
            <div className="flex flex-1 flex-col gap-3">
              <Pill type={type} className="h-8 w-3/4 rounded lg:h-9" />
              <Pill type={type} className="h-5 w-24 rounded" />
              <Pill type={type} className="h-4 w-full rounded" />
              <Pill type={type} className="h-4 w-full rounded" />
              <Pill type={type} className="h-4 w-2/3 rounded" />
            </div>
          </div>
        </Card>
        <Card>
          <Pill type={type} className="mb-4 h-6 w-40 rounded" />
          <div className="flex flex-col gap-2">
            <Pill type={type} className="h-4 w-full rounded" />
            <Pill type={type} className="h-4 w-full rounded" />
            <Pill type={type} className="h-4 w-4/5 rounded" />
          </div>
        </Card>
        <div className="lg:hidden">
          <Card>
            <Pill type={type} className="mb-4 h-5 w-32 rounded" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Pill type={type} className="h-5 w-5 shrink-0 rounded" />
                  <Pill type={type} className="h-4 w-28 rounded" />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card>
          <Pill type={type} className="mb-4 h-6 w-36 rounded" />
          <div className="flex flex-col divide-y divide-tertiary">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Pill type={type} className="h-10 w-10 shrink-0 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Pill type={type} className="h-4 w-40 rounded" />
                    <Pill type={type} className="h-3 w-20 rounded" />
                  </div>
                </div>
                <Pill type={type} className="h-4 w-4 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <Pill type={type} className="mb-4 h-6 w-36 rounded" />
          <div className="mb-2 flex items-center gap-2">
            <Pill type={type} className="h-5 w-24 rounded" />
            <Pill type={type} className="h-4 w-24 rounded" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <Pill type={type} className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Pill type={type} className="h-4 w-28 rounded" />
                <Pill type={type} className="h-3 w-20 rounded" />
                <Pill type={type} className="h-4 w-full rounded" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <div className="flex flex-col gap-5">
            <Pill type={type} className="h-9 w-24 rounded" />
            <Pill type={type} className="h-12 w-full rounded-xl" />
          </div>
        </Card>
        <div className="hidden lg:block">
          <Card>
            <Pill type={type} className="mb-4 h-5 w-32 rounded" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Pill type={type} className="h-5 w-5 shrink-0 rounded" />
                  <Pill type={type} className="h-4 w-28 rounded" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
