import { classnames } from '@lib';
import { forwardRef } from 'react';

const Option = ({ children, isHover, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={classnames('py-1 px-3 cursor-pointer', isHover && 'bg-white/10')}
      {...props}
    >
      {children}
    </li>
  );
};

export default forwardRef(Option);
