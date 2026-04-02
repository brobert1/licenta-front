import { useChessContext } from '@chess/contexts';
import { DEFAULT_BOT, DEFAULT_GAME_SETTINGS } from '@data/bots';
import { constants } from 'next-chessground';
import { coffee } from '@functions';
import { Chess } from 'chess.js';
import {
  buildBotGamePgn,
  createGamePgn,
  determineGameWinner,
  getGamePlayers,
} from '@functions/chess';
import { clearGameState, saveLastGame } from '@functions/bot-game-persistence';
import { useQuery } from '@hooks';
import { createContext, useCallback, useContext, useState } from 'react';
import { useOpeningDetector } from '@chess/hooks';

const BotContext = createContext();

export const BotProvider = ({
  children,
  isGuest = false,
  initialBot = null,
  initialSettings = null,
}) => {
  const { setHistory, setPgn, history } = useChessContext();
  const { currentOpening } = useOpeningDetector();
  const { data: me } = useQuery('/client/account', { enabled: !isGuest });
  const userId = isGuest ? 'guest' : me?._id;
  const playerName = isGuest ? 'Guest' : me?.name;

  const [selectedBot, setSelectedBot] = useState(initialBot || DEFAULT_BOT);
  const [gameSettings, setGameSettings] = useState(initialSettings || DEFAULT_GAME_SETTINGS);
  const [gameWinner, setGameWinner] = useState(null);
  const [terminationReason, setTerminationReason] = useState(null);
  const [savedGameId, setSavedGameId] = useState(null);

  const selectBot = useCallback((botData) => {
    setSelectedBot({
      name: botData.name,
      elo: botData.elo,
      message: botData.message,
      openings: botData.openings,
    });
  }, []);

  const updateGameSettings = useCallback((newSettings) => {
    setGameSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  }, []);

  const setWinner = useCallback((winner, reason = 'resignation') => {
    setGameWinner(winner);
    setTerminationReason(reason);
  }, []);

  const setSavedGame = useCallback((gameId) => {
    setSavedGameId(gameId);
  }, []);

  const handleGameOver = useCallback(
    async (chess, mutation, isUserTimeout = false, currentFen = null) => {
      let winner;
      let reason;

      if (chess === null) {
        // Timeout — check if the winner has insufficient mating material
        const opponentHasInsufficient = currentFen
          ? new Chess(currentFen).isInsufficientMaterial()
          : false;

        if (opponentHasInsufficient) {
          winner = 'Draw';
          reason = 'timeout_insufficient_material';
        } else {
          winner = isUserTimeout ? selectedBot.name : playerName;
          reason = 'timeout';
        }
      } else {
        winner = determineGameWinner(chess, selectedBot.name, playerName, gameSettings.playerColor);

        if (chess.isCheckmate()) {
          reason = 'checkmate';
        } else if (chess.isStalemate()) {
          reason = 'stalemate';
        } else if (chess.isThreefoldRepetition()) {
          reason = 'threefold_repetition';
        } else if (chess.isInsufficientMaterial()) {
          reason = 'insufficient_material';
        } else if (chess.isDraw()) {
          reason = 'fifty_move_rule';
        }
      }

      await coffee(500);
      setGameWinner(winner);
      setTerminationReason(reason);

      // The game is definitively over — remove the persisted save so the
      // resume modal doesn't appear if the user refreshes after this point.
      clearGameState(userId);

      const { white, black } = getGamePlayers(
        gameSettings.playerColor,
        playerName,
        selectedBot.name
      );
      const moveHistory = chess ? chess.history({ verbose: true }) : history;
      const startingFen = gameSettings.selectedPosition?.fen || constants.initialFen;

      const outcome = winner === 'Draw' ? 'draw' : winner === playerName ? 'win' : 'loss';

      const timeControl =
        gameSettings.timeControl?.mode === 'unlimited'
          ? { minutes: null, increment: null }
          : {
              minutes: gameSettings.timeControl?.minutes ?? null,
              increment: gameSettings.timeControl?.increment ?? null,
            };

      if (isGuest) {
        const pgn = buildBotGamePgn({
          history: moveHistory,
          gameSettings,
          gameWinner: winner,
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
            outcome,
            terminationReason: reason ?? null,
            moves: moveHistory.length,
            opening: currentOpening?.name ?? null,
            startingFen,
          },
          'guest'
        );
      } else {
        const pgn = createGamePgn(moveHistory, white, black, startingFen);
        await mutation.mutateAsync({
          playerColor: gameSettings.playerColor,
          playerName,
          botName: selectedBot.name,
          botElo: selectedBot.elo,
          outcome,
          terminationReason: reason ?? null,
          timeControl,
          startingFen,
          pgn,
          moves: moveHistory.length,
          opening: currentOpening?.name ?? 'Failed to fetch opening',
        });
      }
    },
    [selectedBot, gameSettings, history, currentOpening, playerName, isGuest]
  );

  const reset = useCallback(
    (toDefaults = false, clearHistory = true) => {
      setGameWinner(null);
      setTerminationReason(null);
      setSavedGameId(null);
      if (clearHistory) {
        if (setHistory) {
          setHistory([]);
        }
        if (setPgn) {
          setPgn('');
        }
      }
      if (toDefaults) {
        setSelectedBot(DEFAULT_BOT);
        setGameSettings(DEFAULT_GAME_SETTINGS);
      }
    },
    [setHistory, setPgn]
  );

  const value = {
    isGuest,
    userId,
    selectedBot,
    gameSettings,
    gameWinner,
    terminationReason,
    savedGameId,

    selectBot,
    updateGameSettings,
    setWinner,
    setSavedGame,
    handleGameOver,
    reset,
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export const useBotContext = () => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBotContext must be used within a BotProvider');
  }
  return context;
};
