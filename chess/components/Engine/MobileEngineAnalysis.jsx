import { formatEngineScore, formatPvMoves } from '@chess/functions';
import { useEngineAnalysis } from '@chess/hooks';
import { useAnalysisEngine } from '@contexts';
import { classnames } from '@lib';
import { useEffect } from 'react';

const MobileEngineAnalysis = ({ fen, isActive = true, numLines = 1, memory = 256 }) => {
  const { engine, isReady, initializeEngine } = useAnalysisEngine();

  useEffect(() => {
    initializeEngine();
  }, [initializeEngine]);

  const { lines } = useEngineAnalysis(engine, fen, numLines, memory, isActive && isReady);

  const firstLine = lines[0];
  const score = firstLine?.score;
  const pv = firstLine?.pv;

  const evalStr = score ? formatEngineScore(score.type, score.value) : null;
  const isPositive = evalStr ? !evalStr.startsWith('-') : true;
  const isMate = score?.type === 'mate';

  const formattedMoves = fen && pv ? formatPvMoves(fen, pv) : [];
  const firstMove = formattedMoves[0];
  const restMoves = formattedMoves.slice(1);

  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden bg-surface border border-border shadow-sm flex items-stretch h-14">
      <div className="w-16 flex flex-col items-center justify-center bg-secondary border-r border-border flex-shrink-0">
        {!isReady ? (
          <i className="fa-solid fa-circle-notch fa-spin text-muted text-xs" />
        ) : (
          <>
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">
              Eval
            </span>
            <span
              className={classnames(
                'text-sm font-bold tabular-nums',
                isMate
                  ? isPositive
                    ? 'text-emerald-500'
                    : 'text-red-500'
                  : isPositive
                    ? 'text-emerald-500'
                    : 'text-red-500'
              )}
            >
              {evalStr
                ? isMate
                  ? `#${Math.abs(score.value)}`
                  : `${isPositive ? '+' : ''}${evalStr}`
                : '—'}
            </span>
          </>
        )}
      </div>
      <div className="flex-1 px-3 flex flex-col justify-center min-w-0 overflow-x-hidden">
        {!isReady ? (
          <span className="text-xs text-muted">Initializing engine…</span>
        ) : !firstLine ? (
          <span className="text-xs text-muted">Analyzing…</span>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="text-[10px] font-medium text-muted">Stockfish 17.1</span>
            </div>
            <div
              className="text-xs text-primary/80 flex items-center gap-1 overflow-x-auto scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {firstMove && (
                <span className="inline-flex items-center gap-0.5 flex-shrink-0">
                  {firstMove.showNumber && (
                    <span className="text-muted text-[11px] whitespace-nowrap">
                      {firstMove.moveNumber}.{!firstMove.isWhite && '..'}
                    </span>
                  )}
                  <span className="font-bold text-emerald-600 font-chess whitespace-nowrap">
                    {firstMove.move}
                  </span>
                </span>
              )}
              {restMoves.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-0.5 text-primary/70 flex-shrink-0"
                >
                  {m.showNumber && (
                    <span className="text-muted text-[11px] whitespace-nowrap">
                      {m.moveNumber}.{!m.isWhite && '..'}
                    </span>
                  )}
                  <span className="font-chess whitespace-nowrap">{m.move}</span>
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileEngineAnalysis;
