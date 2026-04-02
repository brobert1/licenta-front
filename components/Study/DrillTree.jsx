import { useDrillContext } from '@contexts/DrillContext';
import { size } from 'lodash';
import { Comment } from '@chess/components/PgnViewer';
import DrillMessage from './DrillMessage';

const DrillTree = ({ mode }) => {
  const { values } = useDrillContext();
  const {
    currentIndex = 0,
    whiteMoves, //
    wrongMoves,
    extraComment,
  } = values;
  const mistakes = size(wrongMoves);

  return (
    <div className="flex flex-col items-center justify-start h-full mb-10 pt-5 px-3 lg:px-4">
      <div className="relative w-36 h-36 flex items-center justify-center mb-3">
        <img
          src="/images/capybara-chess.png"
          alt="Chess Coach Capybara"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="w-full text-center rounded-xl border border-border bg-surface text-primary p-4 px-5 shadow-sm">
        <DrillMessage {...{ whiteMoves, mode, currentIndex, mistakes }} />
      </div>
      {mode === 'arrows' && extraComment && (
        <div className="w-full mt-5 mb-6 rounded-xl border border-border bg-surface text-primary p-4 px-5 shadow-sm">
          <Comment comment={extraComment} />
        </div>
      )}
    </div>
  );
};

export default DrillTree;
