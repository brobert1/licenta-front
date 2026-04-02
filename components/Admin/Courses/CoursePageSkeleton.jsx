const CoursePageSkeleton = ({ backgroundColor = 'bg-tertiary' }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col justify-between gap-3 px-4 lg:flex-row lg:items-center lg:px-0">
      <div className="flex flex-col gap-2">
        <div className={`h-8 w-full ${backgroundColor} rounded`}></div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-row gap-1 lg:items-center lg:gap-4">
            <div className={`h-5 w-24 rounded bg-tertiary`}></div>
            <div className={`h-5 w-32 rounded bg-tertiary`}></div>
          </div>
          <div className={`h-5 w-44 ${backgroundColor} rounded`}></div>
        </div>
      </div>
      <div className="flex w-full gap-4 lg:w-1/4">
        <div className={`h-8 w-1/2 ${backgroundColor} rounded`}></div>
        <div className={`h-8 w-1/2 rounded bg-tertiary`}></div>
      </div>
    </div>
    <div className="flex flex-col gap-4 bg-surface border border-border p-4 lg:rounded-lg lg:p-6">
      <div className="border-b pb-2">
        <div className={`h-6 w-44 ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 pb-2">
        <div className={`h-6 w-full ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 pb-2">
        <div className={`h-6 w-full ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 pb-2">
        <div className={`h-6 w-full ${backgroundColor} rounded`}></div>
      </div>
    </div>
    <div className="w-full flex justify-end">
      <div className={`h-5 w-24 rounded bg-tertiary`}></div>
    </div>
    <div className="flex flex-col gap-2 bg-surface border border-border p-4 lg:rounded-lg lg:p-6">
      <div className="border-b pb-2">
        <div className={`h-6 w-44 ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 pb-2">
        <div className={`h-6 w-4/5 ${backgroundColor} rounded`}></div>
        <div className={`h-6 w-1/5 ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 py-1">
        <div className={`h-6 w-4/5 ${backgroundColor} rounded`}></div>
        <div className={`h-6 w-1/5 ${backgroundColor} rounded`}></div>
      </div>
      <div className="flex gap-4 py-1">
        <div className={`h-6 w-4/5 ${backgroundColor} rounded`}></div>
        <div className={`h-6 w-1/5 ${backgroundColor} rounded`}></div>
      </div>
    </div>
  </div>
);

export default CoursePageSkeleton;
