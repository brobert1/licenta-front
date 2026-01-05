import { useEqualHeight } from '@chess/hooks';
import { Fragment } from 'react';
import { GameContent, GameHistory } from '.';

const GamePreviewLayoutLarge = ({ games, index }) => {
  const activeGame = games[index];

  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <div
      ref={targetRef}
      className="flex flex-col mt-4 grid-cols-4 outline-none w-full gap-4 md:grid"
    >
      <div className="col-span-1 flex flex-col overflow-hidden rounded-md">
        <div className="relative flex flex-col flex-grow bg-secondary rounded-md h-full">
          <GameHistory index={index} games={games} />
        </div>
      </div>
      <Fragment key={index}>
        <GameContent activeGame={activeGame} sourceRef={sourceRef} targetRef={targetRef} />
      </Fragment>
    </div>
  );
};

export default GamePreviewLayoutLarge;
