const buildLayoutProps = ({
  data,
  activeChapter,
  chapterIndex,
  layoutType,
  handleNextChapter,
  refetch,
}) => {
  const { pgn, index, name, _id: chapterId } = activeChapter;
  const chapterKey = `${layoutType}-${chapterIndex}`;

  const baseProps = {
    chapterKey,
    data: data?.study,
    progress: data?.progress,
    pgn,
    index,
    onNextChapter: handleNextChapter,
  };

  if (layoutType === 'interactive') {
    return { ...baseProps, chapterId, refetch };
  }

  if (layoutType === 'drill') {
    return { ...baseProps, name, chapterId, refetch };
  }

  return { ...baseProps, name };
};

export default buildLayoutProps;
