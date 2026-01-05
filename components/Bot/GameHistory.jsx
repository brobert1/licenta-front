import { GameHistoryItem, NextGame } from '.';

const GameHistory = ({ index, games = [] }) => {
  return (
    <div className="bg-secondary rounded-md w-full h-full flex flex-col">
      <div className="flex flex-col gap-2 text-white font-semibold p-2.5 bg-zinc-700 rounded-t-md pointer-events-none">
        <span className="form-label mb-0 w-full cursor-pointer">Game History</span>
      </div>
      <div className="flex flex-col pt-0 p-2 text-gray-300 overflow-y-auto flex-1 min-h-0">
        {games.map((game, gameIndex) => (
          <GameHistoryItem
            key={game._id}
            {...game}
            gameIndex={gameIndex}
            isActive={index === gameIndex}
          />
        ))}
      </div>
      <NextGame index={index} games={games} />
    </div>
  );
};

export default GameHistory;
