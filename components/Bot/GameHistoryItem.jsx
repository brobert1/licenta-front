import { classnames } from '@lib';
import { useProfile } from '@hooks';
import { time } from '@functions';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

const getPlayerResult = (result, player) => {
  if (!result || result === 'Draw') return '½';
  return result === player ? '1' : '0';
};

const getStatusStyles = (score) => {
  if (score === '1') return { bg: 'bg-green-500', icon: 'fa-plus' };
  if (score === '0') return { bg: 'bg-red-500', icon: 'fa-minus' };
  return { bg: 'bg-yellow-400', icon: '' };
};

const GameHistoryItem = ({ gameIndex, white, black, result, createdAt, isActive }) => {
  const { me } = useProfile();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/client/play/history#${gameIndex}`);
  }, [router, gameIndex]);

  const whiteResult = useMemo(() => getPlayerResult(result, white), [result, white]);
  const blackResult = useMemo(() => getPlayerResult(result, black), [result, black]);

  const isUserWhite = me?.name === white;
  const userScore = isUserWhite ? whiteResult : blackResult;

  const { bg: statusBg, icon: statusIcon } = useMemo(() => getStatusStyles(userScore), [userScore]);

  const whiteWon = whiteResult === '1';
  const blackWon = blackResult === '1';

  return (
    <div
      className={classnames(
        'border-b border-neutral-700 py-3 px-3 -mx-2 cursor-pointer text-white/80',
        'hover:bg-tertiary hover:text-white text-xs 2xl:text-sm',
        isActive && 'bg-tertiary text-white'
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-5 flex items-center justify-center flex-shrink-0">
          <i className="fa-regular fa-robot text-white/70 text-base" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={classnames(
                  'w-3 h-3 rounded-full bg-white',
                  whiteWon ? 'ring-2 ring-green-400' : 'border border-neutral-600'
                )}
              ></div>
              <span className="text-sm font-medium truncate">
                {me?.name === white ? 'You' : white}
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0 mt-1.5">
              <div
                className={classnames(
                  'w-3 h-3 rounded-full bg-neutral-900 border border-neutral-600',
                  blackWon && 'ring-2 ring-green-400'
                )}
              ></div>
              <span className="text-sm font-medium truncate">
                {me?.name === black ? 'You' : black}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-6 flex-shrink-0">
            <span className="text-sm font-medium text-center font-mono">{whiteResult}</span>
            <span className="text-sm font-medium text-center font-mono">{blackResult}</span>
          </div>
        </div>
        <div
          className={classnames(
            'w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0',
            statusBg
          )}
        >
          {statusIcon ? (
            <i className={classnames('fa-solid', statusIcon, 'text-[11px] text-white')} />
          ) : (
            <span className="text-[11px] text-white font-medium">½</span>
          )}
        </div>
        <span className="text-xs text-white/60 w-24 text-right flex-shrink-0">
          {time(createdAt, 'd MMM yyyy')}
        </span>
      </div>
    </div>
  );
};

export default GameHistoryItem;
