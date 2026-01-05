import { Button } from '@components';
import { PgnTree } from '@chess/components/PgnViewer';

const InteractiveAnalysisView = ({ tree, hideAnalysis }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-1 mb-3">
        <PgnTree tree={tree} onMoveClick={() => {}} />
      </div>
      <div className="p-3 bg-tertiary">
        <Button
          onClick={hideAnalysis}
          className="bg-secondary text-white py-2 px-4 rounded inline-flex items-center justify-center gap-2 transition-colors w-full"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Summary</span>
        </Button>
      </div>
    </div>
  );
};

export default InteractiveAnalysisView;
