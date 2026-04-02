import axios from 'axios';

/**
 * Fetches opening information from Lichess Opening Explorer API
 * @param {string} fen - Current board position in FEN notation
 * @returns {Promise<Object|null>} Opening object with eco and name, or null
 */
const fetchOpeningFromLichess = async (fen) => {
  if (!fen) return null;

  try {
    const response = await axios.get('https://explorer.lichess.ovh/lichess', {
      headers: {
        Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
      },
      params: { fen },
    });

    const data = response.data;
    if (data?.opening) {
      return {
        eco: data.opening.eco || '',
        name: data.opening.name || '',
      };
    }
    return null;
  } catch (error) {
    // 429 = rate limited — expected during heavy play, no need to log
    if (error?.response?.status === 429) return null;
    // eslint-disable-next-line no-console
    console.warn('Failed to fetch opening from Lichess:', error);
    return null;
  }
};

export default fetchOpeningFromLichess;
