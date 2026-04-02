import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { NoSsr, Toggle, Button, VideoPlayer } from '@components';
import { classnames } from '@lib';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useVideoNavigation } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
import { Analysis } from '@chess/components/Engine';
import Chapters from './Chapters';
import ChessTab from './ChessTab';
import NextChapter from './NextChapter';
import StudyControls from './StudyControls';

const StudyLayout = ({ data, progress, index, pgn, onNextChapter }) => {
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
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-slate-800 first-letter:uppercase text-xl font-semibold mb-2">
            {data.name}
          </h2>
          <div>
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
      </div>
      <div ref={targetRef} className="study-layout-panel col-span-2 flex flex-col overflow-hidden">
        <Tabs
          defaultActiveKey="pgn"
          id="study-layout-tabs"
          className="justify-end mb-1 study-layout-tabs"
        >
          <ChessTab icon="fas fa-chess" title="PGN" eventKey="pgn">
            <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary">
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
              <div className="relative bg-white flex flex-col flex-grow min-h-0">
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
                </div>
                <NextChapter onClick={onNextChapter} />
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
          </ChessTab>
          <ChessTab icon="fas fa-video" title="Chapters" eventKey="video">
            <div className="relative rounded-md flex flex-col gap-4 h-full">
              {videoUrl && (
                <NoSsr>
                  <VideoPlayer key={videoPlayerKey} src={videoUrl} onVideoRef={videoRef} />
                </NoSsr>
              )}
              <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
                <Chapters
                  chapters={data.chapters}
                  activeIndex={index}
                  onChapterClick={seekToTime}
                  hasVideo={!!videoUrl}
                  nextLesson={data?.nextLesson}
                  lessonId={data?._id}
                  onNextChapter={onNextChapter}
                  completedChapters={progress?.completedChapters}
                />
              </div>
            </div>
          </ChessTab>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyLayout;
