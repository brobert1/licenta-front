import { useRef, useState } from 'react';

// Manages all clock state for a bot game.
// Reads persisted times from resumeData so clocks continue from where the user left off.
const useGameClock = (resumeData, gameSettings) => {
  const resumedInitialMinutes =
    resumeData?.gameSettings?.timeControl?.minutes ?? gameSettings?.timeControl?.minutes ?? 10;
  const initialSeconds = resumedInitialMinutes * 60;

  const resumedPlayerTime = resumeData?.playerTime;
  const resumedBotTime = resumeData?.botTime;

  const [playerTime, setPlayerTime] = useState(resumedPlayerTime ?? initialSeconds);
  const [botTime, setBotTime] = useState(resumedBotTime ?? initialSeconds);
  const [playerInitialTime, setPlayerInitialTime] = useState(resumedPlayerTime ?? initialSeconds);
  const [botInitialTime, setBotInitialTime] = useState(resumedBotTime ?? initialSeconds);

  // Per-move snapshots used to restore clock state on takeback
  const timeHistoryRef = useRef(resumeData?.timeHistory ? [...resumeData.timeHistory] : []);

  // Prefer resumeData here so isTimedGame is correct on the first render,
  // before the bot context has been restored by useResumeRestore.
  const isTimedGame = (resumeData?.gameSettings ?? gameSettings)?.timeControl?.mode === 'realtime';

  // Resets all clocks back to the full time-control duration (used on rematch)
  const resetClocks = () => {
    setPlayerTime(initialSeconds);
    setBotTime(initialSeconds);
    setPlayerInitialTime(initialSeconds);
    setBotInitialTime(initialSeconds);
    timeHistoryRef.current = [];
  };

  return {
    playerTime,
    setPlayerTime,
    botTime,
    setBotTime,
    playerInitialTime,
    setPlayerInitialTime,
    botInitialTime,
    setBotInitialTime,
    timeHistoryRef,
    isTimedGame,
    resetClocks,
  };
};

export default useGameClock;
