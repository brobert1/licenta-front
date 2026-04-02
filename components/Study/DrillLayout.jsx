import { NoSsr, VideoPlayer } from '@components';
import { useEqualHeight, useDrillCompletion, useVideoNavigation } from '@hooks';
import { usePgnViewer } from '@chess/hooks';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
import Chapters from './Chapters';
import ChessTab from './ChessTab';
import DrillChessground from './DrillChessground';
import DrillSheet from './DrillSheet';
import NextChapter from './NextChapter';

const DrillLayout = ({ data, progress, pgn, index, name, chapterId, onNextChapter, refetch }) => {
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
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-primary first-letter:uppercase text-xl font-semibold mb-2">
            {data.name}
          </h2>
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
        className="study-layout-panel col-span-2 flex flex-col overflow-hidden min-h-0"
      >
        <Tabs
          defaultActiveKey="drill"
          id="drill-layout-tabs"
          className="justify-end mb-1 study-layout-tabs"
        >
          <ChessTab icon="fas fa-chess" title="Drill" eventKey="drill">
            <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary">
              <DrillSheet
                mode={mode}
                name={name}
                pgnProps={pgnProps}
                isCompleted={isCompleted}
                handleRetry={handleRetry}
              />
              <NextChapter onClick={onNextChapter} />
            </div>
          </ChessTab>
          <ChessTab icon="fas fa-video" title="Chapters" eventKey="chapters">
            <div className="relative rounded-md flex flex-col gap-4 h-full">
              {videoUrl && (
                <NoSsr>
                  <VideoPlayer key={videoPlayerKey} src={videoUrl} onVideoRef={videoRef} />
                </NoSsr>
              )}
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
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default DrillLayout;
