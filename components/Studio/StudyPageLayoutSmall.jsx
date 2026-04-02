import { Breadcrumb, Toggle } from '@components';
import { ChessTab } from '@components/Study';
import { useStudyContext } from '@contexts';
import { useMutation } from '@hooks';
import { useEngineSettings, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { PgnEditor } from '@chess/components/PgnEditor';
import { Tabs } from 'react-bootstrap';
import { savePgn } from '@api/client';
import StudyChapters from './StudyChapters';
import { UnderboardTabs } from './Underboard';
import { useEffect, useRef, useState } from 'react';
import { Analysis, EngineSettings } from '@chess/components/Engine';

const StudyPageLayoutSmall = ({ refetch, onAddChapter }) => {
  const { study, activeChapter, index, changeChapter, currentPgn } = useStudyContext();
  const orientation = activeChapter?.orientation || 'white';

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();

  const initialPgnRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  const {
    tree,
    moments,
    current,
    lastMove,
    goToMoment,
    onUserMove,
    setTree,
    pgn: livePgn,
  } = usePgnViewer(currentPgn, {
    resetKey: activeChapter?._id || index,
    startAtLastMove: true,
  });

  const { shapes } = useShapes({ current });

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
    <div className="outline-none w-full flex flex-col gap-2 h-full min-h-0">
      <Breadcrumb page="Studio" title={study?.name} />
      <div className="w-full" key={activeChapter?._id}>
        <NextChessground
          fen={current.fen}
          orientation={orientation}
          shapes={shapes}
          lastMove={lastMove}
          onMove={onUserMove}
        />
      </div>
      <div className="bg-secondary text-primary rounded-md p-3 border border-border">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-semibold">{activeChapter?.name}</h4>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="moves"
        id="study-layout-tabs"
        className="justify-start mt-4 flex-1 min-h-0"
      >
        <ChessTab icon="fas fa-chess" title="Moves" eventKey="moves">
          <div className="w-full bg-surface border border-border rounded-md mb-4 flex flex-col h-full relative">
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
            <Analysis
              current={current}
              isAnalysisOpen={isAnalysisOpen}
              numLines={numLines}
              memory={memory}
            />
            <div className="flex flex-col gap-1 text-muted overflow-y-auto flex-1 min-h-0">
              <PgnEditor tree={tree} current={current} onMoveClick={goToMoment} setTree={setTree} />
            </div>
          </div>
          <div className="border-t border-border mt-4">
            <UnderboardTabs tree={tree} moments={moments} current={current} setTree={setTree} />
          </div>
        </ChessTab>
        <ChessTab icon="fas fa-book" title="Chapters" eventKey="chapters">
          <div className="w-full bg-surface border border-border rounded-md mb-4 flex flex-col h-full">
            <div className="flex flex-col gap-1 text-muted overflow-y-auto flex-1 min-h-0">
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
  );
};

export default StudyPageLayoutSmall;
