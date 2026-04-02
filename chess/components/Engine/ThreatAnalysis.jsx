import { reverseFenColor } from '@chess/functions';
import { usePreviewPosition } from '@chess/hooks';
import { EnginePV, EnginePVPreview } from '.';
import { classnames } from '@lib';

const ThreatAnalysis = ({ fen, threatAnalysis }) => {
  const threatLines = threatAnalysis ? [threatAnalysis] : [];
  const { hoveredMove, previewPosition, containerRef, handleMoveHover } =
    usePreviewPosition(threatLines);

  const isLoading = !threatAnalysis;

  return (
    <div className="text-sm relative">
      <div
        id="engine-progress-bar"
        className={classnames(
          'absolute top-0 left-0 right-0 animate-pulse h-0.5',
          isLoading ? 'bg-gray-600' : ' bg-red-600'
        )}
      />
      <div ref={containerRef} className="pt-0.5" onMouseLeave={() => handleMoveHover(null)}>
        {isLoading ? (
          <div className="p-2 text-white">Analyzing threat...</div>
        ) : (
          threatLines.map((line, index) => (
            <EnginePV
              key={index}
              position={reverseFenColor(fen)}
              lineNumber={index + 1}
              {...line}
              nodes={0}
              onMoveHover={handleMoveHover}
            />
          ))
        )}
      </div>
      {hoveredMove && previewPosition && !isLoading && (
        <EnginePVPreview
          startPosition={reverseFenColor(fen)}
          pv={hoveredMove.pv}
          moveIndex={hoveredMove.moveIndex}
          position={previewPosition}
        />
      )}
    </div>
  );
};

export default ThreatAnalysis;
