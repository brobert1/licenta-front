import { useChessContext } from '@chess/contexts';
import { DEFAULT_BOT, DEFAULT_GAME_SETTINGS } from '@data/bots';
import { constants } from 'next-chessground';
import { coffee } from '@functions';
import { createGamePgn, determineGameWinner, getGamePlayers } from '@functions/chess';
import { useQuery } from '@hooks';
import { createContext, useCallback, useContext, useState } from 'react';
import { useOpeningDetector } from '@chess/hooks';

const BotContext = createContext();

export const BotProvider = ({ children }) => {
  const { setHistory, setPgn, history } = useChessContext();
  const { currentOpening } = useOpeningDetector();
  const { data: me } = useQuery('/client/account');

  const [selectedBot, setSelectedBot] = useState(DEFAULT_BOT);
  const [gameSettings, setGameSettings] = useState(DEFAULT_GAME_SETTINGS);
  const [gameWinner, setGameWinner] = useState(null);
  const [savedGameId, setSavedGameId] = useState(null);

  const selectBot = useCallback((botData) => {
    setSelectedBot({
      name: botData.name,
      elo: botData.elo,
      message: botData.message,
      openingLine: botData.openingLine,
    });
  }, []);

  const updateGameSettings = useCallback((newSettings) => {
    setGameSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  }, []);

  const setWinner = useCallback((winner) => {
    setGameWinner(winner);
  }, []);

  const setSavedGame = useCallback((gameId) => {
    setSavedGameId(gameId);
  }, []);

  const handleGameOver = useCallback(
    async (chess, mutation, show, isUserTimeout = false) => {
      let winner;
      if (isUserTimeout !== undefined && chess === null) {
        winner = isUserTimeout ? selectedBot.name : me.name;
      } else {
        winner = determineGameWinner(chess, selectedBot.name, me.name, gameSettings.playerColor);
      }

      await coffee(500);
      setGameWinner(winner);

      const { white, black } = getGamePlayers(gameSettings.playerColor, me.name, selectedBot.name);

      // Get move history directly from chess object to avoid stale state
      const moveHistory = chess ? chess.history({ verbose: true }) : history;

      await mutation.mutateAsync({
        pgn: createGamePgn(
          moveHistory,
          white,
          black,
          gameSettings.selectedPosition?.fen || constants.initialFen
        ),
        moves: moveHistory.length,
        white,
        black,
        result: winner,
        opening: currentOpening?.name,
      });

      // Show the game over modal
      show();
    },
    [selectedBot, gameSettings, history, me]
  );

  const reset = useCallback(
    (toDefaults = false, clearHistory = true) => {
      setGameWinner(null);
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
    selectedBot,
    gameSettings,
    gameWinner,
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
