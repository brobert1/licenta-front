import { Button } from '@components';
import { useStudyContext } from '@contexts';
import { useExport } from '@hooks';
import { classnames } from '@lib';

const Export = () => {
  const { activeChapter, study } = useStudyContext();
  const {
    isCopied,
    handleCopyPgn,
    handleExportPgn,
    handleCloneStudy,
    handleExportStudyPgn,
    isCloning,
  } = useExport({
    activeChapter,
    study,
  });

  return (
    <div className="p-3">
      <div className="space-y-3">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Chapter Actions
          </h4>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyPgn}
              className="flex-1 px-3 py-2 text-sm bg-tertiary text-white hover:bg-tertiary/80 transition-colors duration-200 rounded flex items-center justify-center"
              disabled={isCopied}
            >
              <i
                className={classnames('fas mr-2', isCopied && 'fa-check', !isCopied && 'fa-copy')}
              ></i>
              {isCopied ? 'Copied' : 'Copy PGN'}
            </Button>
            <Button
              onClick={handleExportPgn}
              className="flex-1 px-3 py-2 text-sm bg-tertiary text-white hover:bg-tertiary/80 transition-colors duration-200 rounded flex items-center justify-center"
            >
              <i className="fas fa-download mr-2"></i>
              Export PGN
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Study Actions
          </h4>
          <div className="flex gap-2">
            <Button
              onClick={handleCloneStudy}
              className="flex-1 px-3 py-2 text-sm bg-accent text-white hover:bg-accent/80 transition-colors duration-200 rounded flex items-center justify-center"
              disabled={isCloning}
            >
              <i
                className={classnames(
                  'mr-2',
                  isCloning ? 'fas fa-spinner fa-spin' : 'fas fa-clone'
                )}
              ></i>
              {isCloning ? 'Cloning...' : 'Clone Study'}
            </Button>
            <Button
              onClick={handleExportStudyPgn}
              className="flex-1 px-3 py-2 text-sm bg-accent text-white hover:bg-accent/80 transition-colors duration-200 rounded flex items-center justify-center"
            >
              <i className="fas fa-file-export mr-2"></i>
              Export Study
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
