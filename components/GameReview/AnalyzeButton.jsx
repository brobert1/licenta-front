import { Button } from '@components';
import { classnames } from '@lib';

const AnalyzeButton = ({ canAnalyze, isProcessing, onClick }) => {
  return (
    <Button
      className={classnames(
        'w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200',
        canAnalyze && !isProcessing
          ? 'bg-accent hover:bg-accent/90 shadow-md hover:shadow-lg hover:-translate-y-0.5'
          : 'bg-accent/50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={isProcessing || !canAnalyze}
    >
      {isProcessing ? (
        <>
          <i className="fas fa-spinner fa-spin" />
          <span>Analyzing game…</span>
        </>
      ) : (
        <>
          <i className="fas fa-magnifying-glass-chart" />
          <span>Analyze Game</span>
        </>
      )}
    </Button>
  );
};

export default AnalyzeButton;
