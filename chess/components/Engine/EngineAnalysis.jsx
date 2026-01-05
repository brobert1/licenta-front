import { useEngineAnalysis, usePreviewPosition } from '@chess/hooks';
import { useAnalysisEngine } from '@contexts';
import { useEffect } from 'react';
import { EnginePV, EnginePVPreview } from '.';
import { classnames } from '@lib';

const EngineAnalysis = ({ fen, numLines, memory, isActive = true }) => {
  const { engine, isReady, initializeEngine } = useAnalysisEngine();

  // Lazy initialization - only load engine when this component mounts
  useEffect(() => {
    initializeEngine();
  }, [initializeEngine]);

  const { lines, sharedNodes } = useEngineAnalysis(
    engine,
    fen,
    numLines,
    memory,
    isActive && isReady
  );
  const { hoveredMove, previewPosition, containerRef, handleMoveHover } = usePreviewPosition(lines);

  return (
    <div className="text-sm relative">
      <div
        id="engine-progress-bar"
        className={classnames(
          'absolute top-0 left-0 right-0 h-0.5 animate-pulse',
          isReady ? ' bg-green-600' : 'bg-gray-600'
        )}
      />
      <div ref={containerRef} className="pt-0.5" onMouseLeave={() => handleMoveHover(null)}>
        {!isReady ? (
          <div className="p-2 text-white">Engine initializing...</div>
        ) : (
          lines.map((line, index) => (
            <EnginePV
              key={index}
              position={fen}
              lineNumber={index + 1}
              {...line}
              nodes={sharedNodes}
              onMoveHover={handleMoveHover}
            />
          ))
        )}
      </div>
      {hoveredMove && previewPosition && isReady && (
        <EnginePVPreview
          startPosition={fen}
          pv={hoveredMove.pv}
          moveIndex={hoveredMove.moveIndex}
          position={previewPosition}
        />
      )}
    </div>
  );
};

export default EngineAnalysis;
