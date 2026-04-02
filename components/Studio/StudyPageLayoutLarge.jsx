import { useStudyContext } from '@contexts';
import { useMutation } from '@hooks';
import { useEngineSettings, useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { Toggle } from '@components';
import { PgnEditor } from '@chess/components/PgnEditor';
import { savePgn } from '@api/client';
import StudyChapters from './StudyChapters';
import { UnderboardTabs } from './Underboard';
import { useEffect, useRef, useState } from 'react';
import { Analysis, EngineSettings } from '@chess/components/Engine';

const StudyPageLayoutLarge = ({ refetch, onAddChapter }) => {
  const { study, activeChapter, index, changeChapter, currentPgn } = useStudyContext();
  const orientation = activeChapter?.orientation || 'white';

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { memory, numLines, setMemory, setNumLines } = useEngineSettings();

  const initialPgnRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  const mutation = useMutation(savePgn, {
    invalidateQueries: `/studies/${study?._id}`,
    successCallback: refetch,
  });

  const {
    tree,
    moments,
    current,
    lastMove,
    goToMoment,
    onUserMove,
    setTree,
    pgn: livePgn,
  } = usePgnViewer(currentPgn, { resetKey: activeChapter?._id || index, startAtLastMove: true });

  const { shapes } = useShapes({ current });
  const { sourceRef, targetRef } = useEqualHeight();

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
    <div className="w-full mt-4 outline-none">
      <div ref={targetRef} className="grid grid-cols-4 w-full gap-x-16 outline-none">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-md">
          <StudyChapters
            chapters={study.chapters}
            activeIndex={index}
            onChangeActiveIndex={changeChapter}
            onAddChapter={onAddChapter}
            study={study}
            onStudyUpdate={refetch}
          />
        </div>
        <div className="col-span-2" key={activeChapter?._id}>
          <div ref={sourceRef}>
            <NextChessground
              fen={current.fen}
              orientation={orientation}
              shapes={shapes}
              lastMove={lastMove}
              onMove={onUserMove}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col overflow-hidden rounded-md">
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
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="grid grid-cols-4 gap-x-16">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <div className="max-w-full overflow-hidden">
              <UnderboardTabs tree={tree} moments={moments} current={current} setTree={setTree} />
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </div>
  );
};

export default StudyPageLayoutLarge;
