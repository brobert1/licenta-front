import { Toggle } from '@components';
import { ChessTab } from '@components/Study';
import { useStudyContext } from '@contexts';
import { useMutation } from '@hooks';
import { useEngineSettings, useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { PgnEditor } from '@chess/components/PgnEditor';
import { Tabs } from 'react-bootstrap';
import { savePgn } from '@api/client';
import StudyChapters from './StudyChapters';
import { UnderboardTabs } from './Underboard';
import { useEffect, useRef, useState } from 'react';
import { Analysis, EngineSettings } from '@chess/components/Engine';

const StudyPageLayout = ({ refetch, onAddChapter }) => {
  const { study, activeChapter, index, changeChapter, currentPgn } = useStudyContext();
  const orientation = activeChapter?.orientation || 'white';

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();

  const initialPgnRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  const {
    tree,
    current,
    lastMove,
    goToMoment,
    onUserMove,
    setTree,
    pgn: livePgn,
    moments,
  } = usePgnViewer(currentPgn, {
    resetKey: activeChapter?._id || index,
    startAtLastMove: true,
  });

  const { shapes } = useShapes({ current });
  const { sourceRef, targetRef } = useEqualHeight();

  const mutation = useMutation(savePgn, {
    invalidateQueries: `/studies/${study?._id}`,
    successCallback: refetch,
  });

  // Store initial PGN and reset first render flag when chapter changes
  useEffect(() => {
    initialPgnRef.current = livePgn;
    isFirstRenderRef.current = true;
  }, [activeChapter?._id]);

  // Auto-save whenever livePgn changes (but skip first render after chapter load)
  useEffect(() => {
    // Skip auto-save on initial render after chapter change
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      initialPgnRef.current = livePgn;
      return;
    }

    // Skip if PGN hasn't changed
    if (!livePgn || livePgn === initialPgnRef.current) {
      return;
    }

    const handleSave = async () => {
      const payload = { pgn: livePgn || '*', id: activeChapter?._id };
      await mutation.mutateAsync(payload);
      initialPgnRef.current = livePgn;
    };

    handleSave();
  }, [livePgn]);

  return (
    <div className="outline-none w-full flex flex-col gap-2">
      <div className="grid grid-cols-5 outline-none w-full gap-6">
        <div className="col-span-3 max-w-chess-board">
          <div ref={sourceRef}>
            <h2 className="text-primary text-xl font-semibold mb-2">{study?.name}</h2>
            <div>
              <NextChessground
                fen={current.fen}
                orientation={orientation}
                shapes={shapes}
                lastMove={lastMove}
                onMove={onUserMove}
              />
            </div>
          </div>
        </div>
        <div
          ref={targetRef}
          className="study-layout-panel col-span-2 flex flex-col overflow-hidden"
        >
          <Tabs defaultActiveKey="moves" id="study-layout-tabs" className="justify-end mb-1">
            <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
              <div className="flex flex-col h-full overflow-hidden rounded-md bg-surface border border-border relative">
                <div className="bg-secondary text-primary flex items-center justify-between px-3 py-2 border-b border-border">
                  <span className="text-primary font-semibold">Engine Analysis</span>
                  <div className="flex items-center">
                    <Toggle label="" initialState={isAnalysisOpen} onToggle={setIsAnalysisOpen} />
                    <EngineSettings
                      numLines={numLines}
                      onNumLinesChange={setNumLines}
                      memory={memory}
                      onMemoryChange={setMemory}
                    />
                  </div>
                </div>
                <div className="relative flex flex-col flex-grow min-h-0">
                  <Analysis
                    current={current}
                    isAnalysisOpen={isAnalysisOpen}
                    numLines={numLines}
                    memory={memory}
                  />
                  <div className="flex flex-col flex-grow min-h-0">
                    <div className="overflow-y-auto min-h-0 flex-grow">
                      <PgnEditor
                        tree={tree}
                        current={current}
                        onMoveClick={goToMoment}
                        setTree={setTree}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ChessTab>
            <ChessTab icon="fas fa-book" title="Chapters" eventKey="chapters">
              <div className="relative rounded-md flex flex-col h-full">
                <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
                  <StudyChapters
                    chapters={study?.chapters}
                    activeIndex={index}
                    onChangeActiveIndex={changeChapter}
                    onAddChapter={onAddChapter}
                    study={study}
                    onStudyUpdate={refetch}
                  />
                </div>
              </div>
            </ChessTab>
          </Tabs>
        </div>
      </div>
      <div className="max-w-chess-board">
        <UnderboardTabs tree={tree} current={current} setTree={setTree} moments={moments} />
      </div>
    </div>
  );
};

export default StudyPageLayout;
