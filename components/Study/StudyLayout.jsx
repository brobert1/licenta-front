import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { Video } from '@components';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useVideoNavigation } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
import { Chapters, ChessTab, Controls, NextChapter } from '.';
import { Analysis } from '@chess/components/Engine';

const StudyLayout = ({
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
    <div className="grid grid-cols-5 outline-none w-full gap-6">
      <div className="col-span-3 max-w-chess-board">
        <div ref={sourceRef}>
          <h2 className="text-white text-xl font-semibold mb-2">{data.name}</h2>
          <div>
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
      </div>
      <div ref={targetRef} className="col-span-2 flex flex-col overflow-hidden">
        <Tabs defaultActiveKey="pgn" id="study-layout-tabs" className="justify-end mb-1">
          <ChessTab icon="fas fa-chess" title="PGN" eventKey="pgn">
            <div className="flex flex-col h-full overflow-hidden rounded-md bg-secondary">
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
              {videoUrl && <Video src={videoUrl} onVideoRef={videoRef} />}
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
