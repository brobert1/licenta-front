import { useChessContext } from '@chess/contexts';
import { fetchOpeningFromLichess } from '@chess/functions/opening-book';
import { useDebounce } from '@hooks';
import { useEffect, useState } from 'react';

/**
 * Hook that detects chess openings using Lichess Opening Explorer API
 * Tracks opening changes in real-time based on current board position
 * @returns {Object} Opening detection state
 */
const useOpeningDetector = () => {
  const { currentFen, history } = useChessContext();
  const debouncedFen = useDebounce(currentFen, 600);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOpening, setCurrentOpening] = useState(null);
  const [isInBook, setIsInBook] = useState(false);

  // Fetch opening when debounced FEN is stable to avoid flooding Lichess API (429)
  useEffect(() => {
    if (!debouncedFen || history.length === 0) {
      setCurrentOpening(null);
      setIsInBook(false);
      return;
    }

    const fetchOpening = async () => {
      setIsLoading(true);

      try {
        const opening = await fetchOpeningFromLichess(debouncedFen);

        if (opening) {
          setCurrentOpening(opening);
          setIsInBook(true);
        } else {
          setIsInBook(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error fetching opening:', error);
        // Keep the last detected opening even on error
        setIsInBook(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpening();
  }, [debouncedFen, history.length]);

  return {
    currentOpening,
    isInBook,
    isLoading,
  };
};

export default useOpeningDetector;
