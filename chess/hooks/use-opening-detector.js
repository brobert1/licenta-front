import { useChessContext } from '@chess/contexts';
import { fetchOpeningFromLichess } from '@chess/functions/opening-book';
import { useEffect, useState } from 'react';

/**
 * Hook that detects chess openings using Lichess Opening Explorer API
 * Tracks opening changes in real-time based on current board position
 * @returns {Object} Opening detection state
 */
const useOpeningDetector = () => {
  const { currentFen, history } = useChessContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentOpening, setCurrentOpening] = useState(null);
  const [isInBook, setIsInBook] = useState(false);

  // Detect opening whenever position changes
  useEffect(() => {
    if (!currentFen || history.length === 0) {
      setCurrentOpening(null);
      setIsInBook(false);
      return;
    }

    const fetchOpening = async () => {
      setIsLoading(true);

      try {
        const opening = await fetchOpeningFromLichess(currentFen);

        if (opening) {
          setCurrentOpening(opening);
          setIsInBook(true);
        } else {
          // Keep the last detected opening, just mark as out of book
          setIsInBook(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching opening:', error);
        // Keep the last detected opening even on error
        setIsInBook(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpening();
  }, [currentFen, history.length]);

  return {
    currentOpening,
    isInBook,
    isLoading,
  };
};

export default useOpeningDetector;
