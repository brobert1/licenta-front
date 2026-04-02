import { classnames } from '@lib';

const StockfishMobileToggle = ({ isActive = false, onToggle }) => {
  const handleClick = () => {
    onToggle?.(!isActive);
  };

  return (
    <div className="fixed right-0 top-[40%] -translate-y-1/2 z-50 md:hidden">
      <button
        onClick={handleClick}
        className={classnames(
          'flex flex-col items-center justify-center',
          'w-10 h-16 rounded-full',
          'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
          'border border-gray-100',
          'transition-all duration-200 ease-in-out',
          'hover:bg-gray-50 hover:scale-105 hover:shadow-lg',
          'active:scale-95',
          isActive
            ? 'text-emerald-500 ring-2 ring-emerald-100'
            : 'text-gray-400 hover:text-gray-600'
        )}
        title={isActive ? 'Disable engine analysis' : 'Enable engine analysis'}
      >
        <i
          className={classnames(
            'fa-light fa-bolt text-lg mb-0.5',
            isActive && 'animate-pulse shadow-emerald-200'
          )}
        ></i>
        <span className="text-xs tracking-wider">SF</span>
      </button>
    </div>
  );
};

export default StockfishMobileToggle;
