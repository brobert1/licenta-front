import React from 'react';

const EditClientFormSkeleton = ({ backgroundColor = 'bg-tertiary' }) => {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-surface border border-border p-6">
        <div className="flex flex-col gap-4 pb-4">
          <h2 className="border-b border-border pb-2 text-lg text-primary font-semibold">Client Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <div className={`h-4 w-20 ${backgroundColor} rounded animate-pulse`} />
                  <div className={`h-10 w-full ${backgroundColor} rounded animate-pulse`} />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <div className={`h-4 w-24 ${backgroundColor} rounded animate-pulse`} />
                  <div className={`h-10 w-full ${backgroundColor} rounded animate-pulse`} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 ${backgroundColor} rounded animate-pulse`} />
              <div className={`h-4 w-12 ${backgroundColor} rounded animate-pulse`} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start mt-4">
        <div className={`h-10 w-32 ${backgroundColor} rounded animate-pulse`} />
      </div>
    </>
  );
};

export default EditClientFormSkeleton;
