import { Button } from '@components';
import { PgnTree } from '@chess/components/PgnViewer';

const InteractiveAnalysisView = ({ tree, hideAnalysis }) => {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <i className="fas fa-chart-line text-xs text-accent" />
          <p className="text-sm font-semibold text-primary">Line Analysis</p>
        </div>
        <p className="mt-1 text-xs text-muted">Review the key line and side variations.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="overflow-hidden rounded-md border border-border bg-secondary">
          <PgnTree tree={tree} onMoveClick={() => {}} />
        </div>
      </div>
      <div className="border-t border-border bg-surface p-3">
        <Button
          onClick={hideAnalysis}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-tertiary px-4 py-2.5 text-primary transition-colors hover:bg-secondary"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Summary</span>
        </Button>
      </div>
    </div>
  );
};

export default InteractiveAnalysisView;
