import { Toggle } from '@components';
import { classnames } from '@lib';

const GamePreviewSidebarTabs = ({
  analysisOpen,
  className,
  isOnline,
  onAnalysisToggle,
  onTabChange,
  renderAnalysisToggle = true,
  tab,
}) => (
  <div
    className={classnames(
      'bg-tertiary text-primary flex items-center justify-between border-b border-border px-3 py-2 gap-2',
      className
    )}
  >
    <div className="flex min-w-0 items-center gap-1">
      {isOnline ? (
        <>
          <button
            type="button"
            onClick={() => onTabChange('analysis')}
            className={classnames(
              'rounded-md px-3 py-1 text-sm font-semibold transition-colors',
              tab === 'analysis' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
            )}
          >
            Analysis
          </button>
          <button
            type="button"
            onClick={() => onTabChange('chat')}
            className={classnames(
              'rounded-md px-3 py-1 text-sm font-semibold transition-colors',
              tab === 'chat' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
            )}
          >
            Chat
          </button>
        </>
      ) : (
        <span className="font-semibold text-primary">Game Analysis</span>
      )}
    </div>
    {tab === 'analysis' && renderAnalysisToggle && (
      <Toggle label="" initialState={analysisOpen} onToggle={onAnalysisToggle} />
    )}
  </div>
);

export default GamePreviewSidebarTabs;
