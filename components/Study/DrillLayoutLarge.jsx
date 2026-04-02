import { useEqualHeight, useDrillCompletion, useVideoNavigation } from '@hooks';
import { usePgnViewer } from '@chess/hooks';
import { useEffect } from 'react';
import Chapters from './Chapters';
import DrillChessground from './DrillChessground';
import DrillSheet from './DrillSheet';
import NextChapter from './NextChapter';
import VideoPanel from './VideoPanel';

const DrillLayoutLarge = ({
  data,
  progress,
  pgn,
  index,
  name,
  chapterId,
  onNextChapter,
  refetch,
  prevVideoUrl,
}) => {
  const { videoRef, seekToTime } = useVideoNavigation();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;
  const videoPlayerKey = activeChapter?._id ?? `${data?._id}-${index}`;

  const pgnProps = usePgnViewer(pgn, {
    autoSelectMainline: true,
    resetKey: activeChapter?._id || index,
    useArrowsToMove: true,
  });

  const { key, mode, setMode, isCompleted, handleComplete, handleRetry, resetDrill } =
    useDrillCompletion({ chapterId, pgnProps, refetch });

  // Reset mode when chapter changes
  useEffect(() => {
    resetDrill();
  }, [index]);

  // Update pgn viewer arrows mode based on mode
  useEffect(() => {
    pgnProps.useArrowsToMove = mode === 'text';
  }, [mode]);

  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <div ref={targetRef} className="grid grid-cols-4 outline-none w-full gap-3">
      <div className="col-span-1 flex flex-col rounded-md overflow-hidden min-h-0">
        <VideoPanel
          remountKey={videoPlayerKey}
          videoUrl={videoUrl}
          prevVideoUrl={prevVideoUrl}
          videoRef={videoRef}
        />
        {data.chapters && (
          <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={seekToTime}
              nextLesson={data?.nextLesson}
              lessonId={data?._id}
              onNextChapter={onNextChapter}
              completedChapters={progress?.completedChapters}
            />
          </div>
        )}
      </div>
      <div className="col-span-2">
        <div ref={sourceRef}>
          <DrillChessground
            key={key}
            pgnProps={pgnProps}
            mode={mode}
            setMode={setMode}
            isCompleted={isCompleted}
            handleComplete={handleComplete}
            isPreview={false}
          />
        </div>
      </div>
      <div
        ref={targetRef}
        className="col-span-1 flex flex-col overflow-hidden rounded-md bg-secondary"
      >
        <DrillSheet
          mode={mode}
          name={name}
          pgnProps={pgnProps}
          isCompleted={isCompleted}
          handleRetry={handleRetry}
        />
        <NextChapter onClick={onNextChapter} />
      </div>
    </div>
  );
};

export default DrillLayoutLarge;
