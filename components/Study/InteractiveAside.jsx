import { usePuzzleContext } from '@chess/contexts';
import { useDisclosure } from '@hooks';
import InteractiveAnalysisView from './InteractiveAnalysisView';
import InteractiveDefaultView from './InteractiveDefaultView';
import InteractiveSummaryView from './InteractiveSummaryView';

const InteractiveAside = ({ tree, data, index, current, moments }) => {
  const { isCompleted } = usePuzzleContext();
  const { isOpen, show, hide } = useDisclosure();

  if (isOpen) {
    return (
      <div className="bg-secondary rounded-md w-full h-full overflow-hidden">
        <InteractiveAnalysisView tree={tree} hideAnalysis={hide} />
      </div>
    );
  }

  if (isCompleted) {
    return <InteractiveSummaryView data={data} index={index} showAnalysis={show} />;
  }

  return <InteractiveDefaultView current={current} moments={moments} />;
};

export default InteractiveAside;
