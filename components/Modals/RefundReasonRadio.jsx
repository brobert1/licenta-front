import { RadioContext } from '@components/Fields';
import { classnames } from '@lib';
import { useContext } from 'react';

const RefundReasonRadio = ({ disabled, label, value }) => {
  const { name, selectedValue, onChange } = useContext(RadioContext);
  const isSelected = selectedValue === value;

  return (
    <label
      className={classnames(
        'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-tertiary',
        isSelected ? 'border-primary/40 bg-primary/5' : 'border-border bg-secondary'
      )}
    >
      <input
        checked={isSelected}
        className="h-4 w-4 cursor-pointer accent-accent"
        disabled={disabled}
        name={name}
        onChange={() => onChange(value)}
        type="radio"
        value={value}
      />
      <span className="text-sm font-medium text-primary">{label}</span>
    </label>
  );
};

export default RefundReasonRadio;
