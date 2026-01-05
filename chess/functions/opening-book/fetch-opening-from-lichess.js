import axios from 'axios';

/**
 * Fetches opening information from Lichess Opening Explorer API
 * @param {string} fen - Current board position in FEN notation
 * @returns {Promise<Object|null>} Opening object with eco and name, or null
 */
const fetchOpeningFromLichess = async (fen) => {
  if (!fen) {
    return null;
  }

  try {
    const response = await axios.get('https://explorer.lichess.ovh/lichess', {
      params: { fen },
    });

    const data = response.data;

    // Check if opening data exists in response
    if (data && data.opening) {
      return {
        eco: data.opening.eco || '',
        name: data.opening.name || '',
      };
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch opening from Lichess:', error);
    return null;
  }
};

export default fetchOpeningFromLichess;
