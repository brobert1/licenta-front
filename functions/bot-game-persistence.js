const storageKey = (userId) => `rooknlearn:botgame:${userId}`;

export const saveGameState = (state) => {
  if (!state.userId) return;
  try {
    localStorage.setItem(
      storageKey(state.userId),
      JSON.stringify({ ...state, savedAt: Date.now() })
    );
  } catch (e) {
    console.warn('[persistence] Failed to save game state:', e);
  }
};

export const loadGameState = (userId) => {
  if (!userId) return null;
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const updateGameTimes = (playerTime, botTime, userId) => {
  if (!userId) return;
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return;
    const saved = JSON.parse(raw);
    localStorage.setItem(
      storageKey(userId),
      JSON.stringify({ ...saved, playerTime, botTime, savedAt: Date.now() })
    );
  } catch (e) {
    // ignore — a stale clock value is better than crashing during active play
  }
};

export const clearGameState = (userId) => {
  if (!userId) return;
  try {
    localStorage.removeItem(storageKey(userId));
  } catch (e) {
    // ignore
  }
};

const lastGameKey = (userId) => `rooknlearn:lastgame:${userId}`;

export const saveLastGame = (game, userId) => {
  if (!game || !userId) return;
  try {
    localStorage.setItem(lastGameKey(userId), JSON.stringify(game));
  } catch (e) {
    console.warn('[persistence] Failed to save last game:', e);
  }
};

export const loadLastGame = (userId) => {
  if (!userId) return null;
  try {
    const raw = localStorage.getItem(lastGameKey(userId));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      // Legacy: raw was a plain PGN string from old saveLastGamePgn
      return { pgn: raw };
    }
  } catch {
    return null;
  }
};

export const clearLastGame = (userId) => {
  if (!userId) return;
  try {
    localStorage.removeItem(lastGameKey(userId));
  } catch {
    // ignore
  }
};
