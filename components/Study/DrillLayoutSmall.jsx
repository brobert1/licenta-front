import { Video } from '@components';
import { useDrillCompletion, useVideoNavigation } from '@hooks';
import { usePgnViewer } from '@hooks/chess';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
import {
  BottomBar,
  Chapters,
  ChangeHintMode,
  ChessTab,
  DrillChessground,
  DrillSheet,
  NextChapter,
} from '.';

const DrillLayoutSmall = ({
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

  const { goNextMoment, goPrevMoment } = pgnProps;

  // Reset mode when chapter changes
  useEffect(() => {
    resetDrill();
  }, [index]);

  // Update pgn viewer arrows mode based on mode
  useEffect(() => {
    pgnProps.useArrowsToMove = mode === 'text';
  }, [mode]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-5/6 mx-auto md:w-full">
        <DrillChessground
          key={key}
          pgnProps={pgnProps}
          mode={mode}
          setMode={setMode}
          isCompleted={isCompleted}
          handleComplete={handleComplete}
          isPreview={false}
          showControls={false}
        />
      </div>
      <Tabs defaultActiveKey="drill" id="drill-layout-small-tabs" className="mb-2">
        <ChessTab icon="fas fa-chess" title="Drill" eventKey="drill">
          <div className="bg-tertiary rounded-t-md w-full h-full flex flex-col">
            <div className="flex flex-col flex-1 overflow-y-auto min-h-0 max-h-80">
              <DrillSheet
                mode={mode}
                name={name}
                pgnProps={pgnProps}
                isCompleted={isCompleted}
                handleRetry={handleRetry}
              />
            </div>
            <NextChapter onClick={onNextChapter} />
          </div>
        </ChessTab>
        {videoUrl && (
          <ChessTab icon="fas fa-play" title="Video" eventKey="video">
            <div className="rounded-t-md w-full h-full flex flex-col">
              <div className="flex flex-col gap-1 p-2 flex-1 min-h-0">
                <Video src={videoUrl} onVideoRef={videoRef} />
              </div>
            </div>
          </ChessTab>
        )}
        <ChessTab icon="fas fa-list" title="Chapters" eventKey="chapters">
          {data.chapters && (
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={seekToTime}
              nextLesson={data?.nextLesson}
              lessonId={data?._id}
              onNextChapter={onNextChapter}
              completedChapters={progress?.completedChapters}
            />
          )}
        </ChessTab>
      </Tabs>
      <BottomBar onNextClick={goNextMoment} onPrevClick={goPrevMoment} isOpen={mode !== 'text'}>
        <ChangeHintMode mode={mode} setMode={setMode} isCompleted={isCompleted} isPreview={false} />
      </BottomBar>
    </div>
  );
};

export default DrillLayoutSmall;
