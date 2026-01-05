import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { Video } from '@components';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useVideoNavigation } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';
import { Chapters, Controls, NextChapter } from '.';
import { Analysis } from '@chess/components/Engine';

const StudyLayoutLarge = ({
  data,
  progress,
  toggle,
  pgn,
  index,
  name,
  hasMoveTrainer,
  onNextChapter,
}) => {
  const { isAnalysisOpen } = useStudyLayout();
  const { videoRef, seekToTime } = useVideoNavigation();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;

  const {
    tree,
    current,
    lastMove,
    goToMoment,
    goNextMoment,
    goPrevMoment,
    variations,
    onVariationChoice,
    onVariationsCancel,
    onUserMove,
  } = usePgnViewer(pgn);

  const { threatShape, threatAnalysis, isThreatActive, setThreatFen, toggleThreat } = useThreat(
    current?.fen
  );

  // Update threat FEN when the current FEN changes
  useEffect(() => {
    setThreatFen(current.fen);
  }, [current.fen, setThreatFen]);

  const { shapes, refocusModal } = useShapes({ current, threatShape });
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
        <div ref={sourceRef}>
          <NextChessground
            fen={current.fen}
            shapes={shapes}
            lastMove={lastMove}
            onMove={onUserMove}
          />
          <Controls
            fen={current.fen}
            onNextClick={goNextMoment}
            onPrevClick={goPrevMoment}
            toggle={toggle}
            hasMoveTrainer={hasMoveTrainer}
            isThreatActive={isThreatActive}
            onThreatToggle={toggleThreat}
          />
        </div>
      </div>
      <div
        ref={targetRef}
        className="col-span-1 flex flex-col overflow-hidden rounded-md bg-secondary"
      >
        <div className="bg-tertiary text-white">
          <p className="text-white font-semibold border-b p-2.5 border-white/10">{name}</p>
        </div>
        <div className="relative flex flex-col flex-grow min-h-0">
          <Analysis
            current={current}
            isAnalysisOpen={isAnalysisOpen}
            isThreatActive={isThreatActive}
            threatAnalysis={threatAnalysis}
          />
          <div className="flex flex-col flex-grow min-h-0">
            <div className="overflow-y-auto min-h-0 flex-grow">
              <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
            </div>
            <NextChapter onClick={onNextChapter} />
          </div>
          {variations && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <MoveModal
                variations={variations}
                onChoice={onVariationChoice}
                onCancel={onVariationsCancel}
                onFocusChange={refocusModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyLayoutLarge;
