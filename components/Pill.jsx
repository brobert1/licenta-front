import { classnames } from '@lib';

const Pill = ({ type, children, className, onClick }) => {
  return (
    <div
      className={classnames(
        'inline-block rounded-lg px-3 py-1 text-xs font-medium leading-tight cursor-pointer',
        type === 'loading' && 'animate-pulse bg-tertiary',
        type === 'error' && 'bg-red-700',
        className || 'bg-gray-200'
      )}
      onClick={onClick} // Add the onClick handler
    >
      {children}
    </div>
  );
};

export default Pill;
