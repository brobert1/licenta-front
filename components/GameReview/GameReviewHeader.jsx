const GameReviewHeader = () => {
  return (
    <div className="mb-8 text-center">
      <img
        src="/images/capybara-game-review-pgn.png"
        alt="Capybara Game Review"
        className="w-32 h-32 lg:w-48 lg:h-48 object-contain mx-auto mb-3 drop-shadow-md"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-heading">
        Analyze Your Chess Game
      </h1>
      <p className="text-sm md:text-base text-muted leading-relaxed max-w-sm mx-auto">
        Paste your PGN notation or upload a file to get a detailed move-by-move breakdown.
      </p>
    </div>
  );
};

export default GameReviewHeader;
