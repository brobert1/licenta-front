import { useEffect, useState } from 'react';
import { classnames } from '@lib';

const formatRemaining = (ms) => {
  if (ms <= 0) return '';

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
};

const SaleCountdown = ({ endAt, className }) => {
  const [remainingMs, setRemainingMs] = useState(() => {
    return new Date(endAt).getTime() - Date.now();
  });

  useEffect(() => {
    const endTime = new Date(endAt).getTime();
    const id = setInterval(() => {
      setRemainingMs(endTime - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  if (remainingMs <= 0) return null;

  return (
    <div
      className={classnames(
        'rounded-md bg-red-600/10 border border-red-600/40 text-red-300 px-3 py-1 text-sm font-semibold w-full text-center flex items-center justify-center gap-2',
        className
      )}
    >
      <i className="fa-regular fa-calendar-clock" />
      <span>
        Ends in <span>{formatRemaining(remainingMs)}</span>
      </span>
    </div>
  );
};

export default SaleCountdown;
