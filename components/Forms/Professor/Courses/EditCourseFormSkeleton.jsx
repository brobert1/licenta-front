const CourseFormSkeleton = ({ backgroundColor = 'bg-tertiary' }) => (
  <div className="flex flex-col gap-4 pb-10">
    <div className="flex flex-row gap-2">
      {/* Course Details Section */}
      <div className="flex flex-row gap-2 w-full bg-secondary p-6 rounded-lg">
        {/* Course Thumbnail */}
        <div className={`aspect-square h-80 w-80 animate-pulse ${backgroundColor} rounded`}></div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-row gap-2">
            <div className="flex w-1/2 flex-col gap-2">
              <div className={`h-4 w-1/2 animate-pulse rounded ${backgroundColor}`}></div>
              <div className={`h-8 w-full animate-pulse rounded ${backgroundColor}`}></div>
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <div className={`h-4 w-1/2 animate-pulse rounded ${backgroundColor}`}></div>
              <div className={`h-8 w-full animate-pulse rounded ${backgroundColor}`}></div>
            </div>
          </div>
          <div className="flex flex-col h-full mt-4 gap-2">
            <div className={`h-8 w-full animate-pulse rounded ${backgroundColor}`}></div>
            <div className={`h-full w-full animate-pulse rounded ${backgroundColor}`}></div>
          </div>
        </div>
      </div>
      {/* Tags and Lessons Section */}
      <div className="flex flex-col w-1/2 gap-4">
        {/* Tags */}
        <div className="bg-secondary p-6 rounded-lg">
          <div className={`h-8 w-32 animate-pulse rounded ${backgroundColor}`}></div>
          <div className={`h-10 w-full animate-pulse rounded mt-4 ${backgroundColor}`}></div>
        </div>

        {/* Lessons */}
        <div className="bg-secondary p-6 rounded-lg">
          <div className={`h-8 w-32 animate-pulse rounded ${backgroundColor}`}></div>
          <div className={`h-10 w-full animate-pulse rounded mt-4 ${backgroundColor}`}></div>
        </div>
      </div>
    </div>

    {/* Course Preview Section */}
    <div className="bg-secondary h-100 p-6 rounded-lg">
      <div className={`h-8 w-48 animate-pulse rounded ${backgroundColor}`}></div>
      <div className="flex gap-4 mt-4">
        <div className={`aspect-square w-40 h-40 animate-pulse rounded ${backgroundColor}`}></div>
        <div className="flex-1">
          <div className={`h-6 w-1/2 animate-pulse rounded ${backgroundColor} mb-2`}></div>
          <div className={`h-6 w-1/3 animate-pulse rounded ${backgroundColor}`}></div>
        </div>
      </div>
    </div>

    {/* Add Button */}
    <div className="flex justify-start">
      <div className={`h-10 w-20 animate-pulse rounded ${backgroundColor}`}></div>
    </div>
  </div>
);

export default CourseFormSkeleton;
