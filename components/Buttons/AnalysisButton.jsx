import { Button } from '@components';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useDisclosure } from '@hooks';
import { classnames } from '@lib';
import { useEffect } from 'react';

const AnalysisButton = ({ disabled, isMobile = false }) => {
  const { isOpen: isAnalysisOpen, toggle: toggleAnalysis } = useDisclosure(false);
  const { updateContext } = useStudyLayout();

  // Update study layout context
  useEffect(() => {
    updateContext({ isAnalysisOpen });
  }, [isAnalysisOpen]);

  return (
    <Button
      className={classnames('button mini tertiary', isAnalysisOpen ? 'bg-gray-600' : 'bg-tertiary')}
      onClick={toggleAnalysis}
      disabled={disabled}
    >
      {!isMobile && <span className="text-xs lg:text-sm font-semibold mr-2">Analysis</span>}
      <i className="fa-solid fa-chart-column"></i>
    </Button>
  );
};

export default AnalysisButton;
