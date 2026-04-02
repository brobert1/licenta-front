const GuestQuizHeader = ({ isTutorial, questionIndex, total, score }) => {
  if (isTutorial) {
    return (
      <div className="mb-4 mt-1 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
          <i className="fa-solid fa-graduation-cap"></i>
          <span>Quick Tutorial</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">How to Play</h1>
        <div className="mx-auto mt-4 mb-1 h-px w-16 bg-border" />
      </div>
    );
  }

  return (
    <div className="mb-4 mt-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Progress
          </span>
          <span className="text-lg font-bold text-primary">
            Question {questionIndex + 1} <span className="text-muted/60">/ {total}</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Score</span>
          <div className="mt-0.5 flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-0.5 text-amber-500">
            <i className="fa-solid fa-trophy text-xs"></i>
            <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-tertiary shadow-inner">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${(questionIndex / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default GuestQuizHeader;
