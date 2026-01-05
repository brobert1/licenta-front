export default (pgn) => {
  try {
    return pgn
      .split('[Event ')
      .map((str) => `[Event ${str}`)
      .slice(1);
  } catch (err) {
    return [];
  }
};
