const ReviewCoach = ({ message }) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <img
        src="/images/capybara-game-review.png"
        alt="Game review coach"
        className="h-20 w-20 flex-shrink-0 object-contain"
      />
      <div className="bg-tertiary rounded-lg p-3 text-sm relative flex-1">
        <div className="absolute left-[-6px] top-4 w-3 h-3 bg-tertiary rotate-45"></div>
        <p className="text-primary">{message}</p>
      </div>
    </div>
  );
};

export default ReviewCoach;
