import { Button } from '@components';
import { useRouter } from 'next/router';

const InteractiveSummaryView = ({ data, index, showAnalysis }) => {
  const router = useRouter();
  const isLastChapter = index === data.chapters?.length - 1;
  const currentChapter = data.chapters?.[index];

  const handleNextChapter = () => {
    if (!isLastChapter) {
      const nextIndex = index + 1;
      router.push(`${router.asPath.split('#')[0]}#${nextIndex}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start mb-10 h-full pt-6">
      <div className="relative w-32 h-32 2xl:w-40 2xl:h-40 flex items-center justify-center mb-4">
        <img
          src="/images/success-capybara.png"
          alt="Success Capybara"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="bg-secondary text-white p-4 px-6 rounded-lg shadow-md relative mt-[-20px] w-80 text-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 top-tooltip"></div>
        {!isLastChapter
          ? 'Congratulations! You completed this exercise.'
          : 'Congratulations! You finished all exercises!'}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full justify-center px-4 sm:px-0">
        {currentChapter?.pgn && (
          <Button
            onClick={showAnalysis}
            className="bg-secondary text-white py-2 px-4 rounded inline-flex items-center justify-center w-full sm:w-auto gap-2 transition-colors"
          >
            <i className="fas fa-chart-line"></i>
            <span>Analysis</span>
          </Button>
        )}
        {!isLastChapter && (
          <Button
            onClick={handleNextChapter}
            className="bg-accent text-white py-2 px-4 rounded inline-flex items-center justify-center w-full sm:w-auto gap-2 transition-colors"
          >
            <i className="fas fa-play"></i>
            <span>Next Chapter</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveSummaryView;
