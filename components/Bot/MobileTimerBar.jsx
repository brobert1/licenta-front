import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts';
import Timer from './Timer';

const MobileTimerBar = ({
  botInitialTime,
  isBotTurn,
  mutation,
  playerInitialTime,
  setBotTime,
  setPlayerTime,
}) => {
  const { currentFen } = useChessContext();
  const { gameSettings, gameWinner, handleGameOver } = useBotContext();
  const { playerColor } = gameSettings;
  const playerIsWhite = playerColor === 'white';

  const isWhiteActive = !gameWinner && (playerIsWhite ? !isBotTurn : isBotTurn);
  const isBlackActive = !gameWinner && (playerIsWhite ? isBotTurn : !isBotTurn);

  return (
    <div className="md:hidden flex items-center justify-between">
      <Timer
        activeClassName="bg-white border-border text-primary shadow-sm"
        className="flex items-center gap-1.5 rounded-lg border px-2 py-1 transition-opacity duration-300"
        iconClassName="fa-regular fa-clock text-xs text-muted"
        inactiveClassName="bg-white border-border text-primary shadow-sm opacity-40"
        increment={gameSettings.timeControl.increment}
        initialTime={playerIsWhite ? playerInitialTime : botInitialTime}
        isActive={isWhiteActive}
        onTimeOut={() => handleGameOver(null, mutation, playerIsWhite, currentFen)}
        onTimeChange={playerIsWhite ? setPlayerTime : setBotTime}
        textClassName="text-xs font-semibold text-primary"
      />
      <Timer
        activeClassName="bg-primary border-primary text-white shadow-sm"
        className="flex items-center gap-1.5 rounded-lg border px-2 py-1 transition-opacity duration-300"
        iconClassName="fa-regular fa-clock text-xs text-white/50"
        inactiveClassName="bg-primary border-primary text-white shadow-sm opacity-40"
        increment={gameSettings.timeControl.increment}
        initialTime={playerIsWhite ? botInitialTime : playerInitialTime}
        isActive={isBlackActive}
        onTimeOut={() => handleGameOver(null, mutation, !playerIsWhite, currentFen)}
        onTimeChange={playerIsWhite ? setBotTime : setPlayerTime}
        textClassName="text-xs font-semibold text-white"
      />
    </div>
  );
};

export default MobileTimerBar;
