import getNextMoment from './get-next-moment';

const checkDrillMove = (moments, currentFen, history) => {
  try {
    const nextMoment = getNextMoment(currentFen, moments);
    const currentMove = history[history.length - 1];
    return nextMoment.move === currentMove;
  } catch {
    return false;
  }
};

export default checkDrillMove;
