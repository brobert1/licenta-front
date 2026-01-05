import { useMultiplayerContext } from '@contexts/MultiplayerContext';
import { useQuery } from '@hooks';
import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { classnames } from '@lib';
import { NextChessground } from 'next-chessground';
import LiveChessBoard from './LiveChessBoard';
import OpponentCard from './OpponentCard';
import LiveGameActions from './LiveGameActions';

const MultiplayerGame = () => {
  const { activeGame, playerColor, opponent, reset, gameResult } = useMultiplayerContext();
  const { data: me } = useQuery('/client/account');

  const { tree, current, goToMoment, lastMoment, goPrevMoment, goNextMoment } = usePgnViewer(
    activeGame?.pgn || '',
    { startAtLastMove: true }
  );

  if (!activeGame || !opponent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-white text-xl">No active game</p>
          <button
            onClick={reset}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  const isGameOver = activeGame.status === 'completed' || activeGame.gameOver;
  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
      <div className="md:col-span-3 max-w-chess-board h-min flex flex-col gap-2">
        <OpponentCard />
        <div className="relative">
          <div className={classnames(isReviewMode && 'invisible')}>
            <LiveChessBoard />
          </div>
          {isReviewMode && (
            <div className="absolute inset-0">
              <NextChessground
                fen={current.fen}
                lastMove={current?.from && current?.to ? [current.from, current.to] : null}
                orientation={playerColor}
                viewOnly={true}
              />
            </div>
          )}
          {isGameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <p className="text-white text-2xl font-bold mb-2">Game Over</p>
                <p className="text-gray-300 text-lg mb-4">
                  {gameResult === '1/2-1/2'
                    ? 'Draw!'
                    : (gameResult === '1-0' && playerColor === 'white') ||
                      (gameResult === '0-1' && playerColor === 'black')
                    ? 'You Won!'
                    : 'You Lost!'}
                </p>
                <button
                  onClick={reset}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-tertiary rounded">
              {me?.image?.path ? (
                <img
                  src={me.image.path}
                  className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
                  alt="Your Avatar"
                />
              ) : (
                <div className="lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center rounded-md bg-primary">
                  <span className="text-white font-bold text-xl">{me?.name?.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-white font-medium text-base">{me?.name}</p>
                <p className="text-gray-300">({me?.elo || 1200})</p>
              </div>
              <p className="text-gray-400 text-sm">{playerColor === 'white' ? 'White' : 'Black'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 flex rounded-lg overflow-hidden flex-col">
        <div className="flex flex-col bg-secondary py-3 gap-3">
          <h3 className="text-white text-lg pt-2 mb-2 font-semibold text-center">
            Live Game vs {opponent.name}
          </h3>
        </div>
        <div className="flex flex-col h-full overflow-hidden bg-secondary">
          <div className="relative flex flex-col flex-grow min-h-0">
            <div className="flex flex-col flex-grow min-h-0">
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree tree={tree} autoScroll={true} current={current} onMoveClick={goToMoment} />
              </div>
            </div>
          </div>
        </div>
        {!isGameOver && <LiveGameActions onPrevMove={goPrevMoment} onNextMove={goNextMoment} />}
        {isGameOver && (
          <div className="flex flex-col bg-secondary gap-4 p-4">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={reset}
                className="col-span-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-chess"></i>
                <span className="text-sm">Find New Game</span>
              </button>
              <button
                className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
                onClick={goPrevMoment}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
                onClick={goNextMoment}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerGame;
