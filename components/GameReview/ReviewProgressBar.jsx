const ReviewProgressBar = ({ progress }) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-primary text-sm font-medium">Analyzing game...</span>
        <span className="text-accent text-sm font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-500 ease-out animate-pulse"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ReviewProgressBar;
