import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { Toggle, Button } from '@components';
import { classnames } from '@lib';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useVideoNavigation } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';
import { Analysis } from '@chess/components/Engine';
import Chapters from './Chapters';
import NextChapter from './NextChapter';
import StudyControls from './StudyControls';
import VideoPanel from './VideoPanel';

const StudyLayoutLarge = ({ data, progress, index, pgn, onNextChapter, prevVideoUrl }) => {
  const { isAnalysisOpen, updateContext } = useStudyLayout();
  const { videoRef, seekToTime } = useVideoNavigation();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;
  const videoPlayerKey = activeChapter?._id ?? `${data?._id}-${index}`;

  const {
    tree,
    moments,
    current,
    lastMove,
    goToMoment,
    goNextMoment,
    goPrevMoment,
    variations,
    onVariationChoice,
    onVariationsCancel,
    onUserMove,
  } = usePgnViewer(pgn, { resetKey: activeChapter?._id || index });

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
          <NextChessground
            fen={current.fen}
            shapes={shapes}
            lastMove={lastMove}
            onMove={onUserMove}
          />
          <StudyControls
            onStart={() => goToMoment(moments[0])}
            onPrev={goPrevMoment}
            onNext={goNextMoment}
            onEnd={() => goToMoment(moments[moments.length - 1])}
          />
        </div>
      </div>
      <div ref={targetRef} className="col-span-1 flex flex-col overflow-hidden rounded-md">
        <div className="bg-tertiary text-primary flex items-center justify-between px-3 py-2 border-b border-border">
          <span className="text-primary font-semibold">Engine Analysis</span>
          <div className="flex items-center gap-1">
            <Toggle
              label=""
              initialState={isAnalysisOpen}
              onToggle={(val) => updateContext({ isAnalysisOpen: val })}
            />
            <Button
              className="p-1 hover:bg-secondary rounded transition-colors w-8 h-8 flex items-center justify-center"
              onClick={toggleThreat}
              title="Toggle Threat"
            >
              <i
                className={classnames(
                  'fa-solid fa-location-crosshairs text-lg',
                  isThreatActive ? 'text-red-500' : 'text-muted hover:text-primary'
                )}
              ></i>
            </Button>
          </div>
        </div>
        <div className="bg-white relative flex flex-col flex-grow min-h-0">
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
