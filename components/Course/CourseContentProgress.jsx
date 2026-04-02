const CourseContentProgress = ({ completedCount = 0, totalCount = 0 }) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const circumference = 2 * Math.PI * 14;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="h-8 w-8 flex-shrink-0">
      <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
        <circle
          className="text-tertiary"
          cx="16"
          cy="16"
          fill="none"
          r="14"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          className="text-accent transition-all duration-300"
          cx="16"
          cy="16"
          fill="none"
          r="14"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

export default CourseContentProgress;
