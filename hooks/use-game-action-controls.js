import { useChessContext } from '@chess/contexts/ChessContext';
import { useBotContext } from '@contexts/BotContext';
import { clearGameState, saveLastGame } from '@functions/bot-game-persistence';
import { buildBotGamePgn, createGamePgn, getGamePlayers } from '@functions/chess';
import { toaster } from '@lib';
import { constants } from 'next-chessground';
import useDisclosure from './use-disclosure';
import useQuery from './use-query';

const useGameActionControls = ({ currentOpening, mutation }) => {
  const { hide, isOpen, show } = useDisclosure();
  const bot = useBotContext();
  const { history } = useChessContext();
  const { gameSettings, gameWinner, isGuest, savedGameId, selectedBot, setWinner, userId } = bot;
  const { data: me } = useQuery('/client/account', { enabled: !isGuest });

  const playerName = isGuest ? 'Guest' : me?.name;
  const shareUrl = savedGameId ? `${process.env.APP_BASE_URL}/game/${savedGameId}` : null;
  const reviewHref = isGuest
    ? '/guest/game-review?source=last-bot-game'
    : savedGameId
      ? `/client/game-review/${savedGameId}`
      : '#';

  const buildCurrentPgn = () =>
    buildBotGamePgn({
      history,
      gameSettings,
      gameWinner,
      savedGameId,
      playerName,
      botName: selectedBot.name,
    });

  const handleDownloadPgn = () => {
    const { white, black } = getGamePlayers(gameSettings.playerColor, playerName, selectedBot.name);
    const pgn = buildCurrentPgn();
    const blob = new Blob([pgn], { type: 'application/x-chess-pgn' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${white}-vs-${black}.pgn`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyPgn = async () => {
    const pgn = buildCurrentPgn();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pgn);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = pgn;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      toaster.success('PGN copied to clipboard');
    } catch {
      toaster.error('Could not copy PGN');
    }
  };

  const handleResignConfirm = () => {
    hide();
    setWinner(selectedBot.name, 'resignation');
    clearGameState(userId);
    const startingFen = gameSettings.selectedPosition?.fen || constants.initialFen;

    if (isGuest) {
      const pgn = buildBotGamePgn({
        history,
        gameSettings,
        gameWinner: selectedBot.name,
        savedGameId: null,
        playerName,
        botName: selectedBot.name,
      });
      saveLastGame(
        {
          pgn,
          playerColor: gameSettings.playerColor,
          playerName,
          botName: selectedBot.name,
          botElo: selectedBot.elo,
          outcome: 'loss',
          terminationReason: 'resignation',
          moves: history.length,
          opening: currentOpening?.name ?? null,
          startingFen,
        },
        'guest'
      );
      return;
    }

    const { white, black } = getGamePlayers(gameSettings.playerColor, playerName, selectedBot.name);
    const pgn = createGamePgn(history, white, black, startingFen);
    const timeControl =
      gameSettings.timeControl?.mode === 'unlimited'
        ? { minutes: null, increment: null }
        : {
            minutes: gameSettings.timeControl?.minutes ?? null,
            increment: gameSettings.timeControl?.increment ?? null,
          };

    mutation.mutate({
      playerColor: gameSettings.playerColor,
      playerName,
      botName: selectedBot.name,
      botElo: selectedBot.elo,
      outcome: 'loss',
      terminationReason: 'resignation',
      timeControl,
      startingFen,
      pgn,
      moves: history.length,
      opening: currentOpening?.name ?? 'Failed to fetch opening',
    });
  };

  const handleShare = async () => {
    if (!navigator.share || !shareUrl) return;

    const { white, black } = getGamePlayers(gameSettings.playerColor, playerName, selectedBot.name);

    await navigator.share({
      title: `${white} vs ${black}`,
      text: `Check out this chess game between ${white} and ${black}.`,
      url: shareUrl,
    });
  };

  return {
    canReviewGame: isGuest || !!savedGameId,
    canShareGame: !!shareUrl,
    canTakeback: history.length > 0,
    handleCopyPgn,
    handleDownloadPgn,
    handleResignConfirm,
    handleShare,
    hideResignModal: hide,
    isGuest,
    isPostGame: !!gameWinner,
    isResignModalOpen: isOpen,
    openResignModal: show,
    reviewHref,
  };
};

export default useGameActionControls;
