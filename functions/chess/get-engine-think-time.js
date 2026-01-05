const getEngineThinkTime = (gameSettings) => {
  const { timeControl } = gameSettings;

  if (timeControl.mode === 'unlimited') {
    // For unlimited time, give engine reasonable thinking time
    return 1500;
  } else {
    // For timed games, calculate based on total time
    const totalMinutes = timeControl.minutes;
    const increment = timeControl.increment || 0;

    // Base time per move (in milliseconds)
    // Use a fraction of total time, assuming ~40 moves per game
    const baseTime = (totalMinutes * 60 * 1000) / 40;
    const incrementTime = increment * 1000;

    // Ensure minimum 500ms and maximum 5000ms thinking time
    return Math.max(500, Math.min(5000, baseTime + incrementTime));
  }
};

export default getEngineThinkTime;
