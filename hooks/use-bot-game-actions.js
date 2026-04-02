import { saveGameState, updateGameTimes } from '@functions/bot-game-persistence';
import { useEffect, useRef } from 'react';

// Owns the two main in-game action handlers: onMove (called after every move)
// and handleTakeback (called when the user requests a takeback).
const useBotGameActions = ({
  gameBoardRef,
  userId,
  selectedBot,
  gameSettings,
  isTimedGame,
  playerTime,
  botTime,
  setPlayerTime,
  setBotTime,
  setPlayerInitialTime,
  setBotInitialTime,
  timeHistoryRef,
  currentOpening,
  resumedOpeningName,
  onPgnMove,
  lastMoment,
  goToMoment,
}) => {
  const takebackPending = useRef(false);

  const playerTimeRef = useRef(playerTime);
  const botTimeRef = useRef(botTime);
  const userIdRef = useRef(userId);
  useEffect(() => {
    playerTimeRef.current = playerTime;
  }, [playerTime]);
  useEffect(() => {
    botTimeRef.current = botTime;
  }, [botTime]);
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // For timed games: patch localStorage with the current clock values once per
  // second so that a refresh mid-move restores an accurate time instead of the
  // snapshot from the last completed move.
  useEffect(() => {
    if (!isTimedGame) return;
    const interval = setInterval(() => {
      updateGameTimes(playerTimeRef.current, botTimeRef.current, userIdRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimedGame]);

  // Navigate the PGN viewer to the new last move after a takeback completes
  useEffect(() => {
    if (takebackPending.current && lastMoment) {
      takebackPending.current = false;
      goToMoment(lastMoment);
    }
  }, [lastMoment]);

  const onMove = (chess) => {
    if (isTimedGame) {
      timeHistoryRef.current.push({ playerTime, botTime });
    }
    saveGameState({
      userId,
      botName: selectedBot.name,
      gameSettings,
      history: chess.history({ verbose: true }),
      pgn: chess.pgn(),
      playerTime,
      botTime,
      timeHistory: [...timeHistoryRef.current],
      openingName: currentOpening?.name || null,
    });
    onPgnMove(chess);
  };

  const handleTakeback = () => {
    if (!gameBoardRef.current) return;

    const result = gameBoardRef.current.takeback();
    if (!result) return;

    const { count: undoneCount, history: newHistory, pgn: newPgn } = result;

    takebackPending.current = true;

    // Restore clock times by popping as many snapshots as moves were undone
    let restoredPlayerTime = playerTime;
    let restoredBotTime = botTime;
    if (isTimedGame && timeHistoryRef.current.length >= undoneCount) {
      let restored;
      for (let i = 0; i < undoneCount; i++) {
        restored = timeHistoryRef.current.pop();
      }
      restoredPlayerTime = restored.playerTime;
      restoredBotTime = restored.botTime;
      setPlayerTime(restoredPlayerTime);
      setBotTime(restoredBotTime);
      setPlayerInitialTime(restoredPlayerTime);
      setBotInitialTime(restoredBotTime);
    }

    // Persist immediately so a refresh after a takeback doesn't replay the undone moves
    saveGameState({
      userId,
      botName: selectedBot.name,
      gameSettings,
      history: newHistory,
      pgn: newPgn,
      playerTime: restoredPlayerTime,
      botTime: restoredBotTime,
      timeHistory: [...timeHistoryRef.current],
      openingName: resumedOpeningName,
    });
  };

  return { onMove, handleTakeback };
};

export default useBotGameActions;
