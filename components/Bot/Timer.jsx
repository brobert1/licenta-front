import { formatGameTime } from '@functions';
import { useTimeControl } from '@hooks';
import { classnames } from '@lib';

const Timer = ({
  activeClassName = 'bg-green-500/10 border-green-500 text-primary shadow-sm',
  className = 'flex items-center justify-center py-1.5 px-3 text-base border-2 rounded-md transition-all duration-300 w-24',
  iconClassName = '',
  inactiveClassName = 'bg-secondary border-border text-muted opacity-60',
  increment = 0,
  initialTime = 180,
  isActive = false,
  onTimeChange,
  onTimeOut,
  textClassName = '',
}) => {
  const displaySeconds = useTimeControl({
    initialTime,
    isActive,
    increment,
    onTimeOut,
    onTimeChange,
  });

  return (
    <div className={classnames(className, isActive ? activeClassName : inactiveClassName)}>
      {!!iconClassName && <i className={iconClassName} />}
      <p className={classnames('font-mono', textClassName)}>{formatGameTime(displaySeconds)}</p>
    </div>
  );
};

export default Timer;
