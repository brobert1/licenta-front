import { calculateCoursePricing, stripTags } from '@functions';

const CourseHeaderCard = ({ course, user }) => {
  const { endsIn, percentOff } = calculateCoursePricing(course);
  const showSaleInfo = course?.active && course?.sale?.isActive && !user?.isOwned;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm min-w-0">
      <div className="flex flex-col gap-6 lg:flex-row min-w-0">
        <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-xl lg:w-48">
          <img alt={course.name} className="h-full w-full object-cover" src={course.image?.path} />
        </div>
        <div className="flex flex-col gap-3 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-primary lg:text-3xl break-words">{course.name}</h1>
          {showSaleInfo && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-yellow-300 bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                <i className="fa-solid fa-bolt" /> Limited Time Sale
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                <i className="fa-solid fa-percent" /> {percentOff}% off
              </span>
              {endsIn && (
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-300 bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                  <i className="fa-regular fa-clock" /> Ends in {endsIn}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-white">
              {course.author?.title}
            </span>
            <p className="font-semibold text-primary break-words">{course.author?.name}</p>
          </div>
          <div className="line-clamp-3 text-sm text-muted first-letter:uppercase break-words whitespace-pre-line">
            {stripTags(course.preview?.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeaderCard;
