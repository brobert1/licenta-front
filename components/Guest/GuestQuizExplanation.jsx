import { classnames } from '@lib';

const GuestQuizExplanation = ({ selected, options }) => {
  if (!selected) return null;
  const correct = options.find((o) => o.isCorrect);
  const isCorrect = selected.isCorrect;

  return (
    <div
      className={classnames(
        'mt-4 flex flex-col gap-2.5 rounded-2xl border p-5 text-sm',
        isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
      )}
    >
      <div className="flex items-center gap-2.5">
        {isCorrect ? (
          <i className="fa-solid fa-circle-check text-xl text-green-500"></i>
        ) : (
          <i className="fa-solid fa-circle-xmark text-xl text-red-500"></i>
        )}
        <span className="text-base font-bold text-primary">
          {isCorrect ? 'Excellent move!' : 'Not quite right'}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">
        {selected.explanation ||
          (isCorrect
            ? 'You found the best continuation.'
            : 'This move allows your opponent to gain an advantage.')}
      </p>
      {!isCorrect && correct && (
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
          <i className="fa-solid fa-lightbulb text-accent"></i>
          <span className="text-sm font-medium text-primary">
            Best move was
            <span className="font-chess font-bold text-accent ml-1">{correct.san}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default GuestQuizExplanation;
