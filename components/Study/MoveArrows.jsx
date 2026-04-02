import { Button } from '@components';

const MoveArrows = ({ goPrevMoment, goNextMoment, disabled }) => {
  return (
    <div className="flex flex-nowrap gap-1 justify-end">
      <Button
        className="inline-flex items-center justify-center rounded border border-border px-2 py-2 text-primary bg-surface hover:bg-secondary transition-colors text-xl min-w-9 min-h-9 disabled:opacity-60"
        onClick={goPrevMoment}
        disabled={disabled}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </Button>
      <Button
        className="inline-flex items-center justify-center rounded border border-border px-2 py-2 text-primary bg-surface hover:bg-secondary transition-colors text-xl min-w-9 min-h-9 disabled:opacity-60"
        onClick={goNextMoment}
        disabled={disabled}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </div>
  );
};

export default MoveArrows;
