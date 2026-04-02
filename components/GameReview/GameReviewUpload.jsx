import { useState } from 'react';
import { Button } from '@components';
import { isValidPgn, pgnSplit } from '@functions';
import { extractGameFromPgn } from '@functions/chess';
import { toaster, classnames } from '@lib';
import AnalyzeButton from './AnalyzeButton';
import GameReviewHeader from './GameReviewHeader';
import PgnPasteTab from './PgnPasteTab';
import PgnUploadTab from './PgnUploadTab';

const TABS = [
  { id: 'paste', label: 'Paste PGN', icon: 'fa-paste' },
  { id: 'upload', label: 'Upload File', icon: 'fa-file-arrow-up' },
];

const GameReviewUpload = ({ onPgnUploaded }) => {
  const [pgnText, setPgnText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('paste');

  const processPgn = (rawPgn) => {
    setIsProcessing(true);

    try {
      const pgns = pgnSplit(rawPgn);

      if (pgns.length > 1) {
        throw new Error(
          'You can review only one game at a time. Please upload a file with a single game.'
        );
      }

      const firstPgn = pgns[0];

      if (!firstPgn || !isValidPgn(firstPgn)) {
        throw new Error(
          'Invalid PGN format. Please ensure your file contains valid chess notation.'
        );
      }

      const gameData = extractGameFromPgn(firstPgn);
      onPgnUploaded(gameData);
    } catch (error) {
      console.error('PGN processing error:', error);
      toaster.error(error.message || 'Failed to process PGN. Please check the format.');
      setIsProcessing(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (!pgnText.trim()) {
      toaster.error('Please paste PGN notation or upload a .pgn file (single game only).');
      return;
    }
    processPgn(pgnText);
  };

  const canAnalyze = pgnText.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-xl pb-12">
      <GameReviewHeader />
      <div className="bg-white rounded-2xl shadow-lg border border-tertiary overflow-hidden">
        <div className="flex border-b border-tertiary">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classnames(
                'flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5'
                  : 'text-muted hover:text-primary hover:bg-secondary'
              )}
            >
              <i className={`fas ${tab.icon} text-xs`} />
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="p-5 md:p-6">
          <div className={classnames(activeTab !== 'paste' && 'hidden')}>
            <PgnPasteTab pgnText={pgnText} setPgnText={setPgnText} isProcessing={isProcessing} />
          </div>
          <div className={classnames(activeTab !== 'upload' && 'hidden')}>
            <PgnUploadTab onFileLoaded={setPgnText} isProcessing={isProcessing} pgnText={pgnText} />
          </div>
          <div className="mt-5">
            <AnalyzeButton
              canAnalyze={canAnalyze}
              isProcessing={isProcessing}
              onClick={handleAnalyzeClick}
            />
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted mt-4">
        <i className="fas fa-lock mr-1 opacity-60" />
        Your game data is never stored or shared.
      </p>
    </div>
  );
};

export default GameReviewUpload;
