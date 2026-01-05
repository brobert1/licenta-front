import { PgnTree } from '@chess/components/PgnViewer';
import { usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { NoSsr, Video } from '@components';
import { AnalysisButton, ThreatButton, TrainButton } from '@components/Buttons';
import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { useVideoNavigation } from '@hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';
import { Tabs } from 'react-bootstrap';
import { BottomBar, Chapters, ChessTab, NextChapter } from '.';
import { Analysis } from '@chess/components/Engine';

const StudyLayoutSmall = ({
  data,
  progress,
  toggle,
  pgn,
  index,
  hasMoveTrainer,
  onNextChapter,
}) => {
  const { isAnalysisOpen } = useStudyLayout();
  const { videoRef, seekToTime } = useVideoNavigation();

  const activeChapter = data.chapters?.find((chapter) => chapter.index === index);
  const videoUrl = activeChapter?.video;

  const { tree, current, lastMove, goToMoment, goNextMoment, goPrevMoment, onUserMove } =
    usePgnViewer(pgn, { autoSelectMainline: true });

  const { threatShape, threatAnalysis, isThreatActive, setThreatFen, toggleThreat } = useThreat(
    current?.fen
  );

  // Update threat FEN when the current FEN changes
  useEffect(() => {
    setThreatFen(current.fen);
  }, [current.fen, setThreatFen]);

  const { shapes } = useShapes({ current, threatShape });

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 2xl:grid-cols-4 outline-none w-full gap-4 pb-12">
      <div className="study-layout-center md:col-span-3 2xl:col-span-2 flex flex-col gap-4">
        <div className="w-5/6 mx-auto md:w-full">
          <NoSsr>
            <NextChessground
              fen={current.fen}
              shapes={shapes}
              lastMove={lastMove}
              onMove={onUserMove}
            />
          </NoSsr>
        </div>
      </div>
      <div className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md">
        <div className="bg-secondary rounded-md h-full flex flex-col">
          <div className="sticky top-0 z-10 bg-secondary">
            <h2 className="text-white text-base font-semibold mb-2 p-4 pb-0">{data?.name}</h2>
            <Analysis
              current={current}
              isAnalysisOpen={isAnalysisOpen}
              isThreatActive={isThreatActive}
              threatAnalysis={threatAnalysis}
            />
          </div>
          <div className="flex flex-col flex-1 relative overflow-y-auto p-4 pt-0">
            <PgnTree tree={tree} current={current} onMoveClick={goToMoment} autoScroll={true} />
            <NextChapter onClick={onNextChapter} />
          </div>
        </div>
      </div>
      <div className="hidden 2xl:col-span-1 2xl:flex 2xl:flex-col overflow-hidden rounded-md">
        <div className="bg-secondary rounded-md h-full">
          <Chapters
            chapters={data.chapters}
            activeIndex={index}
            onChapterClick={seekToTime}
            hasVideo={!!videoUrl}
            lessonId={data?._id}
            nextLesson={data?.nextLesson}
            onNextChapter={onNextChapter}
            completedChapters={progress?.completedChapters}
          />
        </div>
      </div>
      <div className="study-layout-right flex flex-col col-span-2 2xl:hidden">
        <Tabs defaultActiveKey="moves" className="mb-4">
          <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
            <div className="bg-secondary rounded-t-md w-full h-full flex flex-col">
              <div className="sticky top-0 z-10 bg-secondary">
                <div className="bg-tertiary text-white rounded-t-md">
                  <div className="flex gap-2 text-white font-semibold border-b p-2.5 border-white/10">
                    <p>{data?.name}</p>
                  </div>
                </div>
                <Analysis
                  current={current}
                  isAnalysisOpen={isAnalysisOpen}
                  isThreatActive={isThreatActive}
                  threatAnalysis={threatAnalysis}
                />
              </div>
              <div className="flex flex-col flex-1 gap-1 text-gray-300 overflow-y-auto min-h-0 max-h-80">
                <PgnTree tree={tree} current={current} onMoveClick={goToMoment} autoScroll={true} />
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
            <Chapters
              chapters={data.chapters}
              activeIndex={index}
              onChapterClick={seekToTime}
              hasVideo={!!videoUrl}
              lessonId={data?._id}
              nextLesson={data?.nextLesson}
              onNextChapter={onNextChapter}
              completedChapters={progress?.completedChapters}
            />
          </ChessTab>
        </Tabs>
      </div>
      <BottomBar onNextClick={goNextMoment} onPrevClick={goPrevMoment} isOpen={toggle}>
        <AnalysisButton disabled={toggle} isMobile={true} />
        <ThreatButton
          disabled={toggle}
          fen={current.fen}
          isMobile={true}
          isActive={isThreatActive}
          onToggle={toggleThreat}
        />
        {hasMoveTrainer && process.env.HAS_MOVE_TRAINER === 'yes' && (
          <TrainButton
            fen={current.fen}
            isOpen={toggle}
            toggle={toggle}
            goNextMoment={goNextMoment}
            isMobile={true}
          />
        )}
      </BottomBar>
    </div>
  );
};

export default StudyLayoutSmall;
