import { Button } from '@components';

const MoveArrows = ({ goPrevMoment, goNextMoment, disabled }) => {
  return (
    <div className="flex flex-wrap gap-1 justify-end">
      <Button
        className="button mini tertiary text-xl min-w-9 min-h-9"
        onClick={goPrevMoment}
        disabled={disabled}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </Button>
      <Button
        className="button mini tertiary text-xl min-w-9 min-h-9"
        onClick={goNextMoment}
        disabled={disabled}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </div>
  );
};

export default MoveArrows;
