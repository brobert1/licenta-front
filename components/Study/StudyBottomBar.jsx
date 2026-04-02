import { Button } from '@components';

const StudyBottomBar = ({
  onNextChapter,
  onPrev,
  onNext,
  isAtEnd,
  isCompleted,
  onMarkCompleted,
}) => {
  return (
    <div className="flex-shrink-0 w-full px-5 pb-5 pt-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface border border-border shadow-sm px-4 py-3 overflow-hidden">
        {isAtEnd && !isCompleted && onMarkCompleted ? (
          <Button
            className="flex items-center gap-2 bg-emerald-600 text-white font-semibold text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 transition-opacity"
            onClick={onMarkCompleted}
          >
            Mark as completed
            <i className="fa-solid fa-check text-xs"></i>
          </Button>
        ) : isAtEnd && isCompleted ? (
          <Button
            className="flex items-center gap-2 bg-emerald-600/10 text-emerald-700 border border-emerald-200 font-semibold text-sm rounded-xl px-5 py-3 shadow-sm"
            onClick={onNextChapter}
          >
            <i className="fa-solid fa-check text-xs"></i>
            Completed
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2 bg-accent text-white font-semibold text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 transition-opacity"
            onClick={onNextChapter}
          >
            Next chapter
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Button>
        )}

        <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
          <Button
            className="flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-tertiary active:bg-border transition-colors"
            onClick={onPrev}
            aria-label="Previous move"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-tertiary active:bg-border transition-colors"
            onClick={onNext}
            aria-label="Next move"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyBottomBar;
