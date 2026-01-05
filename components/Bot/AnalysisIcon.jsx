import { classnames } from '@lib';

// Background color classes for annotations
const annotationBgColors = {
  '!!': 'bg-emerald-400',
  '!': 'bg-sky-400',
  '!?': 'bg-lime-400',
  '?!': 'bg-yellow-500',
  '?': 'bg-orange-500',
  '??': 'bg-red-700',
};

const AnalysisIcon = ({ boardOrientation, suffix, lastMove }) => {
  if (!suffix || !lastMove) {
    return null;
  }

  const bgColor = annotationBgColors[suffix] || 'bg-gray-500';

  // Get the destination square of the last move
  const targetSquare = lastMove;

  // Calculate position based on algebraic notation
  let file = targetSquare.charCodeAt(0) - 97; // 'a' is 97 in ASCII, so a=0, b=1, etc.
  let rank = Number(targetSquare[1]) - 1; // Convert rank to 0-based index

  // Mirror the coordinates if the board is oriented for black
  if (boardOrientation === 'black') {
    file = 7 - file;
    rank = 7 - rank;
  }

  const leftClasses = [
    'left-0',
    'left-[12.5%]',
    'left-[25%]',
    'left-[37.5%]',
    'left-[50%]',
    'left-[62.5%]',
    'left-[75%]',
    'left-[87.5%]',
  ];

  const bottomClasses = [
    'bottom-0',
    'bottom-[12.5%]',
    'bottom-[25%]',
    'bottom-[37.5%]',
    'bottom-[50%]',
    'bottom-[62.5%]',
    'bottom-[75%]',
    'bottom-[87.5%]',
  ];

  const leftClass = leftClasses[file];
  const bottomClass = bottomClasses[rank];

  return (
    <div
      id="analysis-icon"
      className={classnames('top-right w-[14%] h-[14%]', leftClass, bottomClass)}
    >
      <div
        className={classnames(
          'relative w-6 h-6 md:w-7 md:h-7 animate-feedback-in rounded-full z-100 flex items-center justify-center',
          bgColor
        )}
      >
        <span className="text-white text-sm 2xl:text-base font-bold">{suffix}</span>
      </div>
    </div>
  );
};

export default AnalysisIcon;
