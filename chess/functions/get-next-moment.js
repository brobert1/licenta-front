const isSquare = (value) => typeof value === 'string' && /^[a-h][1-8]$/.test(value);

const isPlayableMoment = (moment) => {
  return Boolean(moment?.move && isSquare(moment?.from) && isSquare(moment?.to));
};

/**
 * Get the next moment in the drill based on the current FEN
 */
const getNextMoment = (moments, currentFen) => {
  try {
    if (!Array.isArray(moments) || !moments.length) {
      return null;
    }

    // Prefer a real move node for the current FEN, not spacer/comment nodes.
    const currentMoment = moments.find((moment) => {
      return moment?.fen === currentFen && isPlayableMoment(moment);
    });

    if (!currentMoment) {
      return moments.find(isPlayableMoment) || null;
    }

    return (
      moments.find((moment) => {
        return (
          isPlayableMoment(moment) &&
          moment?.depth === currentMoment?.depth &&
          moment?.index > currentMoment?.index
        );
      }) || null
    );
  } catch {
    return null;
  }
};

export default getNextMoment;
