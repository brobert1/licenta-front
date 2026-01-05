import { EngineAnalysis, ThreatAnalysis } from '.';

const Analysis = ({
  current,
  isAnalysisOpen,
  isThreatActive,
  threatAnalysis,
  numLines = 1,
  memory = 256,
}) => {
  if (!isAnalysisOpen) {
    return null;
  }

  return (
    <div id="engine-analysis" className="flex flex-col bg-secondary text-sm">
      {isThreatActive ? (
        <ThreatAnalysis fen={current?.fen} numLines={numLines} threatAnalysis={threatAnalysis} />
      ) : (
        <EngineAnalysis
          fen={current?.fen}
          numLines={numLines}
          memory={memory}
          isActive={!isThreatActive}
        />
      )}
    </div>
  );
};

export default Analysis;
