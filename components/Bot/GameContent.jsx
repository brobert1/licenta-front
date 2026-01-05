import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer } from '@chess/hooks';
import { Button, Link } from '@components';
import { useProfile } from '@hooks';
import { NextChessground } from 'next-chessground';

const GameContent = ({ activeGame, sourceRef, targetRef }) => {
  const { _id: id, pgn, black } = activeGame || {};
  const { me } = useProfile();

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn, { startAtLastMove: true });

  const orientation = me?.name === black ? 'black' : 'white';

  return (
    <>
      <div className="game-layout-center col-span-2 flex flex-col gap-4">
        <div ref={sourceRef}>
          <NextChessground
            fen={current.fen}
            lastMove={lastMove}
            orientation={orientation}
            onMove={onUserMove}
          />
          <div className="flex flex-wrap justify-between gap-2 mt-2.5">
            <Link
              className="button mini bg-accent text-white flex items-center gap-2 border-3 border-accent"
              href={`/client/game-review/${id}`}
            >
              <i className="fa-solid fa-chess"></i>
              <span className="font-semibold">Computer Analysis</span>
            </Link>
            <div className="flex flex-wrap gap-1">
              <Button className="button mini tertiary text-xl" onClick={goPrevMoment}>
                <i className="fa-solid fa-chevron-left"></i>
              </Button>
              <Button className="button mini tertiary text-xl" onClick={goNextMoment}>
                <i className="fa-solid fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div ref={targetRef} className="col-span-1 flex flex-col overflow-hidden rounded-md">
        <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary relative">
          <div className="bg-tertiary text-white flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="text-white font-semibold">Game Analysis</span>
          </div>
          <div className="relative flex flex-col flex-grow min-h-0">
            <div className="flex flex-col flex-grow min-h-0">
              <div className="overflow-y-auto min-h-0 flex-grow">
                <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameContent;
