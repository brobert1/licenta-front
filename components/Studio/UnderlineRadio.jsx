import { classnames } from '@lib';
import { useContext } from 'react';
import { RadioContext } from '@components/Fields';

const UnderlineRadio = ({ children, className, ...props }) => {
  const { name, selectedValue, onChange } = useContext(RadioContext);
  const selected = props.value === selectedValue;

  // Add context values to props
  props.name = name;
  props.onChange = onChange;

  return (
    <div className={classnames('group', className)}>
      <label className="inline-flex flex-col items-center cursor-pointer">
        <input type="radio" role="radio" className="hidden" {...props} />
        <span
          className={classnames(
            'transition-all duration-200 ease-in-out text-sm font-medium px-3 py-2 whitespace-nowrap',
            selected ? 'text-accent' : 'text-grey group-hover:text-white'
          )}
        >
          {children}
        </span>
        <div
          className={classnames(
            'transition-all duration-200 ease-in-out h-0.5 bg-blue-400 rounded-full',
            selected ? 'w-full opacity-100' : 'w-0 opacity-0'
          )}
        ></div>
      </label>
    </div>
  );
};

export default UnderlineRadio;
