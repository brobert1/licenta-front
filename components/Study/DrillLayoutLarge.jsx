import { Video } from '@components';
import { useEqualHeight, useDrillCompletion, useVideoNavigation } from '@hooks';
import { usePgnViewer } from '@hooks/chess';
import { useEffect } from 'react';
import { Chapters, DrillChessground, DrillSheet, NextChapter } from '.';

const DrillLayoutLarge = ({
  data,
  progress,
  pgn,
  index,
  name,
  chapterId,
  onNextChapter,
  refetch,
}) => {
  const { videoRef, seekToTime } = useVideoNavigation();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;

  const pgnProps = usePgnViewer(pgn, {
    autoSelectMainline: true,
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
    <div ref={targetRef} className="grid grid-cols-4 outline-none w-full gap-8">
      <div className="col-span-1 flex flex-col gap-4 rounded-md overflow-hidden">
        {videoUrl && <Video src={videoUrl} onVideoRef={videoRef} />}
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
        <div key={key} ref={sourceRef}>
          <DrillChessground
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
