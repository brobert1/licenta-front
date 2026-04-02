import { Button } from '@components';
import { useRouter } from 'next/router';

const InteractiveSummaryView = ({ data, index, showAnalysis }) => {
  const router = useRouter();
  const chapterCount = data.chapters?.length || 0;
  const isLastChapter = index === data.chapters?.length - 1;
  const currentChapter = data.chapters?.[index];
  const completionPercent = chapterCount ? Math.round(((index + 1) / chapterCount) * 100) : 0;

  const handleNextChapter = () => {
    if (!isLastChapter) {
      const nextIndex = index + 1;
      router.push(`${router.asPath.split('#')[0]}#${nextIndex}`);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-start px-4 py-6">
      <div className="relative mb-3 flex h-28 w-28 items-center justify-center 2xl:h-36 2xl:w-36">
        <img
          src="/images/capybara-coach.png"
          alt="Capybara Coach"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-4 text-center text-primary shadow-sm">
        {!isLastChapter
          ? 'Congratulations! You completed this exercise.'
          : 'Congratulations! You finished all exercises!'}
        <p className="mt-2 text-xs text-muted">
          Chapter {index + 1} of {chapterCount}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-tertiary">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>
      <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5">
        {!isLastChapter && (
          <Button
            onClick={handleNextChapter}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-white transition-colors hover:opacity-95"
          >
            <i className="fas fa-play" />
            <span>Next Chapter</span>
          </Button>
        )}
        {currentChapter?.pgn && (
          <Button
            onClick={showAnalysis}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-primary transition-colors hover:bg-tertiary"
          >
            <i className="fas fa-chart-line" />
            <span>Analysis</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveSummaryView;
