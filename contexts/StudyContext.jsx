import { emptyPgn } from '@chess/constants/empty-pgn';
import { extractFen } from '@chess/functions';
import { useRerender } from '@hooks';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo } from 'react';

const StudyContext = createContext();

export const StudyProvider = ({ children, study, index }) => {
  const router = useRouter();
  const [key, rerender] = useRerender();

  // Active chapter
  const activeChapter = useMemo(() => {
    return study?.chapters?.[index];
  }, [study, index]);

  // Current PGN from active chapter
  const currentPgn = useMemo(() => {
    // If chapter has a custom FEN but no PGN, create a PGN with that FEN
    if (activeChapter?.fen && !activeChapter?.pgn) {
      return [
        `[FEN "${activeChapter.fen}"]`,
        '[SetUp "1"]',
        '',
        '*',
      ].join('\n');
    }
    return activeChapter?.pgn || emptyPgn;
  }, [activeChapter]);

  // Current FEN extracted from PGN
  const currentFen = useMemo(() => {
    return extractFen(currentPgn);
  }, [currentPgn]);

  // Chapter navigation handler
  const changeChapter = (newIndex) => {
    router.push(`${router.asPath.split('#')[0]}#${newIndex}`);
  };

  // Trigger rerender when chapter changes
  useEffect(() => {
    rerender();
  }, [index, currentPgn]);

  const value = {
    // Study data
    study,
    activeChapter,
    index,

    // Chess state
    currentFen,
    currentPgn,
    key,

    // Actions
    changeChapter,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

export const useStudyContext = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudyContext must be used within a StudyProvider');
  }
  return context;
};
