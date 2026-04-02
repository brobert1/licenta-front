import { pluralize } from '@functions';

const DrillMessage = ({ whiteMoves, mode, currentIndex, mistakes }) => {
  if (mode === 'retry') {
    return (
      <div className="flex flex-col gap-2">
        <div>
          You have made {mistakes} {pluralize('mistake', mistakes)} in this drill. You must retry
          and correct them before you can play again.
        </div>
      </div>
    );
  }

  if (whiteMoves <= 0) {
    return null;
  }

  const message = {
    arrows: "Let's play! Follow the arrows!",
    squares:
      'Time to make it more interesting! Recreate the line by following the highlighted piece',
    nohint: 'Time to take it to the next level! Recreate the line without any hints.',
  };

  return (
    <span>
      {message[mode]} ({currentIndex}/{whiteMoves})
    </span>
  );
};

export default DrillMessage;
