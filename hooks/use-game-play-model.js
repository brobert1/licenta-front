import { saveGame } from '@api/client';
import { useChessContext } from '@chess/contexts';
import { parseFen } from '@chess/functions';
import { useOpeningDetector, usePgnViewer } from '@chess/hooks';
import { useBotContext } from '@contexts/BotContext';
import { clearGameState } from '@functions/bot-game-persistence';
import { useEffect, useRef, useState } from 'react';
import useBotGameActions from './use-bot-game-actions';
import useGameClock from './use-game-clock';
import useMutation from './use-mutation';
import useRerender from './use-rerender';
import useResumeRestore from './use-resume-restore';

const useGamePlayModel = ({
  BoardComponent,
  isEngineReady,
  onClearResumeData,
  onEndGame,
  resumeData,
}) => {
  const [boardKey, rerender] = useRerender('game-board');
  const [resumedOpeningName, setResumedOpeningName] = useState(resumeData?.openingName || null);
  const gameBoardRef = useRef();

  const { currentFen, history, pgn } = useChessContext();
  const {
    gameSettings,
    gameWinner,
    handleGameOver,
    isGuest,
    reset,
    selectedBot,
    setSavedGame,
    userId,
  } = useBotContext();

  const activeSettings = gameSettings;
  const { name: botName, elo: botElo, openings } = selectedBot;
  const { playerColor, selectedPosition } = resumeData?.gameSettings ?? activeSettings;

  useResumeRestore(resumeData);

  const review = usePgnViewer(pgn, {
    resetKey: boardKey,
    startAtLastMove: !!resumeData,
  });

  const { currentOpening } = useOpeningDetector();
  const currentTurn = parseFen(currentFen)?.activeColor || 'w';
  const isBotTurn = !gameWinner && currentTurn !== (playerColor === 'white' ? 'w' : 'b');
  const openingLine = playerColor === 'white' ? openings?.black : openings?.white;

  const clock = useGameClock(resumeData, activeSettings);

  useEffect(() => {
    if (currentOpening?.name) setResumedOpeningName(currentOpening.name);
  }, [currentOpening?.name]);

  const mutation = useMutation(saveGame, {
    successCallback: (data) => {
      if (data?.data?._id) setSavedGame(data.data._id);
    },
  });

  const onGameOver = (chess) => handleGameOver(chess, isGuest ? null : mutation);

  const { onMove, handleTakeback } = useBotGameActions({
    botTime: clock.botTime,
    currentOpening,
    gameBoardRef,
    gameSettings: activeSettings,
    goToMoment: review.goToMoment,
    isTimedGame: clock.isTimedGame,
    lastMoment: review.lastMoment,
    onPgnMove: review.onUserMove,
    playerTime: clock.playerTime,
    resumedOpeningName,
    selectedBot,
    setBotInitialTime: clock.setBotInitialTime,
    setBotTime: clock.setBotTime,
    setPlayerInitialTime: clock.setPlayerInitialTime,
    setPlayerTime: clock.setPlayerTime,
    timeHistoryRef: clock.timeHistoryRef,
    userId,
  });

  const handleBackToSetup = () => {
    clearGameState(userId);
    onClearResumeData?.();
    reset(true);
    onEndGame();
    rerender();
  };

  const handleRematch = () => {
    clearGameState(userId);
    onClearResumeData?.();
    reset(false);
    clock.resetClocks();
    rerender();
  };

  return {
    actions: { handleBackToSetup, handleRematch, handleTakeback, onGameOver, onMove },
    board: {
      BoardComponent,
      boardKey,
      botElo,
      gameBoardRef,
      isEngineReady,
      openingLine,
      playerColor,
      resumeHistory: resumeData?.history,
      selectedPosition,
      timeControl: clock.isTimedGame ? activeSettings.timeControl : null,
    },
    clock: {
      botInitialTime: clock.botInitialTime,
      botTime: clock.botTime,
      isBotTurn,
      isTimedGame: clock.isTimedGame,
      playerInitialTime: clock.playerInitialTime,
      playerTime: clock.playerTime,
      setBotTime: clock.setBotTime,
      setPlayerTime: clock.setPlayerTime,
    },
    game: { botName, currentOpening, gameWinner, history, mutation, resumedOpeningName },
    review: {
      canGoNext: review.canGoNext,
      canGoPrev: review.canGoPrev,
      current: review.current,
      goNextMoment: review.goNextMoment,
      goPrevMoment: review.goPrevMoment,
      goToMoment: review.goToMoment,
      isReviewMode:
        review.current?.index !== review.lastMoment?.index && review.lastMoment?.index > 0,
      mainlineMoments: review.mainlineMoments,
      tree: review.tree,
    },
  };
};

export default useGamePlayModel;
