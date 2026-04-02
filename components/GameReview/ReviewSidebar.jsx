import { Button } from '@components';
import { useReviewProgress } from '@hooks';
import { useMemo } from 'react';
import EvaluationChart from './EvaluationChart';
import ReviewCategoryTable from './ReviewCategoryTable';
import ReviewCoach from './ReviewCoach';
import ReviewPlayerCards from './ReviewPlayerCards';
import ReviewProgressBar from './ReviewProgressBar';
import coachMessages from '@constants/coach-messages';

const ReviewSidebar = ({
  game,
  me,
  isAnalyzing,
  analyzedPgn,
  accuracy,
  accuracyPercentage,
  evaluations,
  onStartReview,
}) => {
  const { outcome, pgn } = game || {};
  const progress = useReviewProgress(isAnalyzing, pgn);

  // Determine coach message
  // outcome is "win"|"loss"|"draw" for bot games; may be undefined for uploaded PGN games
  const getMessageKey = () => {
    if (isAnalyzing) return 'loading';
    if (outcome === 'win') return 'win';
    if (outcome === 'draw') return 'draw';
    if (outcome === 'loss') return 'loss';
    return 'neutral';
  };

  const messageKey = getMessageKey();

  const coachMessage = useMemo(() => {
    const messages = coachMessages[messageKey];
    return messages[Math.floor(Math.random() * messages.length)];
  }, [messageKey]);

  const isComplete = !isAnalyzing && !!analyzedPgn;
  const showProgress = !isComplete && (isAnalyzing || progress < 100);
  const showStartButton = isComplete;

  return (
    <div className="flex flex-col h-full rounded-md bg-white">
      <div className="bg-tertiary rounded-t-md text-white flex items-center justify-center gap-2 px-3 py-3 border-b border-white/10">
        <i className="fas fa-circle-star text-accent text-lg"></i>
        <span className="text-primary font-bold text-lg">Game Review</span>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <ReviewCoach message={coachMessage} />
        {showProgress && <ReviewProgressBar progress={progress} />}
        {isComplete && <EvaluationChart evaluations={evaluations} />}
        <ReviewPlayerCards
          game={game}
          me={me}
          whiteAccuracy={accuracyPercentage?.white}
          blackAccuracy={accuracyPercentage?.black}
          isLoading={!isComplete}
        />
        <ReviewCategoryTable
          whiteCounts={accuracy?.white || {}}
          blackCounts={accuracy?.black || {}}
          isLoading={!isComplete}
        />
      </div>
      {showStartButton && (
        <div className="p-4 border-t border-white/10">
          <Button className="button full accent text-lg py-2 w-full" onClick={onStartReview}>
            <i className="fas fa-play mr-2"></i>
            Start Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSidebar;
