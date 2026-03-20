import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { extractFen } from '@chess/functions';
import { StudyLayoutProvider } from '@contexts/StudyLayoutContext';
import { buildLayoutProps } from '@functions';
import { useProfile, useQuery } from '@hooks';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import StudyLessonResponsive from './StudyLessonResponsive';

const StudyLesson = ({ id, chapterIndex = 0, isPreview }) => {
  const { me } = useProfile();
  const endpoint = isPreview
    ? me?.role === 'professor'
      ? '/professor/studies'
      : '/admin/studies'
    : '/client/studies';
  const { data, status, refetch } = useQuery(`${endpoint}/${id}`);

  const router = useRouter();
  const handleNextChapter = useCallback(() => {
    const nextIndex = chapterIndex + 1;
    if (data?.study?.chapters && nextIndex < data.study.chapters.length) {
      router.push(`${router.asPath.split('#')[0]}#${nextIndex}`);
    }
  }, [chapterIndex, data?.study?.chapters, router]);

  const activeChapter = data?.study?.chapters[chapterIndex] || {};
  const { pgn, analysis } = activeChapter;

  const interactiveFen = useMemo(
    () => (analysis === 'interactive' && pgn ? extractFen(pgn) : null),
    [analysis, pgn]
  );

  const layoutType = analysis || 'study';
  const layoutProps = buildLayoutProps({
    data,
    activeChapter,
    chapterIndex,
    layoutType,
    handleNextChapter,
    refetch,
  });

  return (
    <ChessProvider key={`chapter-${chapterIndex}`} fen={interactiveFen}>
      <PuzzleProvider key={`chapter-${chapterIndex}`}>
        <StudyLayoutProvider>
          <StudyLessonResponsive
            status={status}
            layoutType={layoutType}
            layoutProps={layoutProps}
          />
        </StudyLayoutProvider>
      </PuzzleProvider>
    </ChessProvider>
  );
};

export default StudyLesson;
