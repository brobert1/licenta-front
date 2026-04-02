import { useState, useEffect } from 'react';
import { Button } from '@components';
import { truncate, pgnSplit } from '@functions';
import { classnames } from '@lib';
import { toaster } from '@lib';
import { FileUploader } from 'react-drag-drop-files';

const PgnUploadTab = ({ onFileLoaded, isProcessing, pgnText }) => {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!pgnText) {
      setFileName('');
    }
  }, [pgnText]);

  const handleFileUpload = (file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const content = reader.result;
      const pgns = pgnSplit(content);

      if (pgns.length > 1) {
        toaster.error('You can review only one game at a time.');
        setFileName('');
        onFileLoaded('');
        return;
      }

      onFileLoaded(content);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
        PGN File
      </label>
      <FileUploader
        handleChange={handleFileUpload}
        name="pgn-upload"
        types={['PGN']}
        multiple={false}
        disabled={isProcessing}
        classes="focus-within:outline-none cursor-pointer w-full"
        onDraggingStateChange={setIsDragging}
      >
        <div
          className={classnames(
            'relative flex flex-col items-center justify-center w-full h-60 rounded-xl border-2 border-dashed px-6 cursor-pointer transition-all duration-200',
            isDragging && 'border-accent bg-accent/5 scale-[1.01]',
            !isDragging && fileName && 'border-green-400 bg-green-50',
            !isDragging &&
              !fileName &&
              'border-tertiary bg-surface hover:border-accent/50 hover:bg-accent/5'
          )}
        >
          {fileName ? (
            <>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <i className="fas fa-file-check text-xl text-green-500" />
              </div>
              <p className="text-sm font-semibold text-primary">{truncate(fileName, 32)}</p>
              <p className="text-xs text-muted mt-1">File loaded — ready to analyze</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setFileName('');
                  onFileLoaded('');
                }}
                className="mt-3 text-xs text-muted hover:text-accent underline"
              >
                Remove file
              </Button>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <i
                  className={classnames(
                    'fas fa-file-arrow-up text-xl text-accent transition-transform duration-200',
                    isDragging && 'scale-110'
                  )}
                />
              </div>
              <p className="text-sm font-semibold text-primary">
                {isDragging ? 'Drop your file here' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-muted mt-1">PGN files only · Single game</p>
            </>
          )}
        </div>
      </FileUploader>
    </div>
  );
};

export default PgnUploadTab;
