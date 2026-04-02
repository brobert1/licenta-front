import { classnames } from '@lib';
import { useEffect, useState } from 'react';

const Toggle = ({ label = 'Toggle me', initialState = false, onToggle, disabled, extraClass }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    setIsChecked(initialState);
  }, [initialState]);

  const handleChange = () => {
    if (!disabled) {
      const newState = !isChecked;
      setIsChecked(newState);
      if (onToggle) {
        onToggle(newState);
      }
    }
  };

  return (
    <label
      className={classnames(
        'inline-flex items-center cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
        disabled={disabled}
      />
      <div
        className={classnames(
          'relative h-6 w-11 rounded-full border border-border bg-secondary transition-colors peer-checked:border-accent peer-checked:bg-accent',
          "after:absolute after:left-0.5 after:top-1/2 after:h-5 after:w-5 after:-translate-y-1/2 after:rounded-full after:border after:border-border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-5",
          extraClass
        )}
      />
      <span className="ml-3 text-sm font-medium text-primary">{label}</span>
    </label>
  );
};

export default Toggle;
