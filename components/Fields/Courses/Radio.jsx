import { classnames } from '@lib';
import { useContext } from 'react';
import { RadioContext } from '..';

const Radio = ({ children, ...props }) => {
  const { name, selectedValue, onChange } = useContext(RadioContext);
  const selected = props.value === selectedValue;

  // Add context values to props
  props.name = name;
  props.onChange = onChange;

  return (
    <div className="mt-2 group font-heading">
      <label className="inline-flex items-center">
        <input type="radio" role="radio" className="hidden" {...props} />
        <span
          className={classnames(
            'transition-all duration-300 ease-in-out h-4 bg-white transform',
            selected ? 'scale-x-100 w-0.5 opacity-100' : 'scale-x-0 w-0 opacity-0'
          )}
        ></span>
        <div
          className={classnames(
            'transition-all duration-300 ease-in-out text-grey flex items-center gap-2 group-hover:text-white group-hover:cursor-pointer',
            selected ? 'text-white ml-2' : 'ml-0'
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
};

export default Radio;
