import { Button } from '@components';

const GuestQuizOption = ({ option, selected, submitted, onTap }) => {
  let containerCls = 'bg-surface border border-border';
  let labelCls = 'bg-tertiary text-primary';
  let sanCls = 'text-primary';

  if (selected && !submitted) {
    containerCls = 'bg-surface border border-accent';
    labelCls = 'bg-accent text-white';
  }
  if (submitted) {
    if (option.isCorrect) {
      containerCls = 'bg-green-50 border border-green-500';
      labelCls = 'bg-green-100 text-green-700';
      sanCls = 'text-green-700';
    } else if (selected) {
      containerCls = 'bg-red-50 border border-red-400';
      labelCls = 'bg-red-100 text-red-600';
      sanCls = 'text-red-600';
    } else {
      containerCls = 'bg-surface border border-border opacity-50';
    }
  }

  return (
    <Button
      onClick={() => onTap(option)}
      disabled={submitted}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition-all ${containerCls}`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${labelCls}`}
      >
        {option.label}
      </span>
      <span className={`font-chess text-base font-semibold ${sanCls}`}>{option.san}</span>
    </Button>
  );
};

export default GuestQuizOption;
