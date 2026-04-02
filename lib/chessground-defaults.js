import store from 'store2';

const DEFAULTS = { board: 'brown', pieces: 'neo' };

const seedChessgroundDefaults = () => {
  if (typeof window === 'undefined') return;
  Object.entries(DEFAULTS).forEach(([key, value]) => {
    if (store.get(`chessground.${key}`) == null) {
      store.set(`chessground.${key}`, value);
    }
  });
};

export default seedChessgroundDefaults;
