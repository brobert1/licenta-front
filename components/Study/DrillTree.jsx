import { useDrillContext } from '@contexts/DrillContext';
import { size } from 'lodash';
import { Comment } from '@chess/components/PgnViewer';
import { DrillMessage } from '.';

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
    <div className="flex flex-col items-center justify-start h-full mb-10 pt-6">
      <div className="relative w-32 h-32 2xl:w-40 2xl:h-40 flex items-center justify-center mb-4">
        <img
          src="/images/success-capybara.png"
          alt="Chess Coach Capybara"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="bg-secondary text-white p-4 px-6 rounded-lg shadow-md relative mt-[-20px] w-80 text-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 top-tooltip"></div>
        <DrillMessage {...{ whiteMoves, mode, currentIndex, mistakes }} />
      </div>
      {mode === 'arrows' && extraComment && (
        <div className="bg-secondary text-white p-4 px-6 rounded-lg shadow-md mt-6 mb-6 w-80">
          <Comment comment={extraComment} />
        </div>
      )}
    </div>
  );
};

export default DrillTree;
