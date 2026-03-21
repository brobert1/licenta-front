import { Button } from '@components';
import { ConfirmationModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { constants } from 'next-chessground';
import { createGamePgn, getGamePlayers } from '@functions/chess';
import { useDisclosure, useQuery } from '@hooks';

const GameBotActions = ({ show, mutation, onPrevMove, onNextMove, currentOpening }) => {
  const { isOpen, show: showModal, hide } = useDisclosure();
  const { matchPlayerColor, selectedBot, gameSettings, setWinner } = useBotContext();
  const { history } = useChessContext();
  const { data: me } = useQuery('/client/account');

  const handleResignClick = () => {
    showModal();
  };

  const handleResignConfirm = async () => {
    hide();
    setWinner(selectedBot.name);

    // Determine white and black players
    const colorForPgn = matchPlayerColor || gameSettings.playerColor;
    const safeColor = colorForPgn === 'random' ? 'white' : colorForPgn;
    const { white, black } = getGamePlayers(safeColor, me.name, selectedBot.name);

    mutation.mutate({
      pgn: createGamePgn(
        history,
        white,
        black,
        gameSettings.selectedPosition?.fen || constants.initialFen
      ),
      moves: history.length,
      white,
      black,
      result: selectedBot.name,
      opening: currentOpening?.name,
    });

    show(); // Show GameOverModal
  };

  return (
    <>
      <div className="flex flex-col bg-gameplay gap-3 p-4 border-t border-black/10">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2">
            <Button
              className="w-full rounded-lg bg-gameplay-control hover:bg-gameplay-elevated text-on-surface font-landing text-sm font-semibold p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors border border-black/10"
              onClick={handleResignClick}
            >
              <i className="fa-solid fa-flag text-tertiary-container"></i>
              <span>Resign</span>
            </Button>
          </div>
          <Button
            className="rounded-lg bg-gameplay-control hover:bg-gameplay-elevated text-on-surface border border-black/10 text-lg w-full p-3 flex items-center justify-center transition-colors"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="rounded-lg bg-gameplay-control hover:bg-gameplay-elevated text-on-surface border border-black/10 text-lg w-full p-3 flex items-center justify-center transition-colors"
            onClick={onNextMove}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={hide}
        onConfirm={handleResignConfirm}
        title="Resign Game"
        message="Are you sure you want to resign? This will end the game and you will lose."
      />
    </>
  );
};

export default GameBotActions;
