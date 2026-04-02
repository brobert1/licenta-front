import { Button } from '@components';
import { AnalysisButton, ThreatButton, TrainButton } from '@components/Buttons';

const Controls = ({
  fen,
  onNextClick,
  onPrevClick,
  isOpen,
  toggle,
  hasMoveTrainer,
  isThreatActive,
  onThreatToggle,
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-2 mt-2.5">
      <div className="flex flex-wrap gap-1">
        <AnalysisButton disabled={isOpen} />
        <ThreatButton
          disabled={isOpen}
          fen={fen}
          isActive={isThreatActive}
          onToggle={onThreatToggle}
        />
        {hasMoveTrainer && process.env.HAS_MOVE_TRAINER === 'yes' && (
          <TrainButton fen={fen} isOpen={isOpen} toggle={toggle} goNextMoment={onNextClick} />
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        <Button className="button mini tertiary text-xl" onClick={onPrevClick} disabled={isOpen}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        <Button className="button mini tertiary text-xl" onClick={onNextClick} disabled={isOpen}>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default Controls;
