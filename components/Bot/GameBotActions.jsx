import { Button } from '@components';
import { ConfirmationModal } from '@components/Modals';
import { useBotContext } from '@contexts/BotContext';
import { useChessContext } from '@chess/contexts/ChessContext';
import { constants } from 'next-chessground';
import { createGamePgn, getGamePlayers } from '@functions/chess';
import { useDisclosure, useQuery } from '@hooks';

const GameBotActions = ({ show, mutation, onPrevMove, onNextMove, currentOpening }) => {
  const { isOpen, show: showModal, hide } = useDisclosure();
  const { selectedBot, gameSettings, setWinner } = useBotContext();
  const { history } = useChessContext();
  const { data: me } = useQuery('/client/account');

  const handleResignClick = () => {
    showModal();
  };

  const handleResignConfirm = async () => {
    hide();
    setWinner(selectedBot.name);

    // Determine white and black players
    const { white, black } = getGamePlayers(gameSettings.playerColor, me.name, selectedBot.name);

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
      <div className="flex flex-col bg-secondary gap-4 p-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2">
            <Button
              className="hover:bg-neutral-700 w-full rounded-md text-neutral-400 hover:text-neutral-300 p-3.5 flex items-center justify-center gap-2 cursor-pointer bg-tertiary transition-colors"
              onClick={handleResignClick}
            >
              <i className="fa-solid fa-flag"></i>
              <span className="text-sm">Resign</span>
            </Button>
          </div>
          <Button
            className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
            onClick={onPrevMove}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="button full tertiary border-0 text-lg w-full hover:text-neutral-300 transition-colors hover:bg-neutral-700"
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
