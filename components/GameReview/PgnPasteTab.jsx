import { Button } from '@components';
import { classnames } from '@lib';

const PgnPasteTab = ({ pgnText, setPgnText, isProcessing }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
        Game Notation
      </label>
      <div className="relative">
        <textarea
          className={classnames(
            'w-full h-60 px-4 py-3 border rounded-xl resize-none font-mono text-xs md:text-sm bg-surface text-primary leading-relaxed transition-all duration-200',
            'placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
            pgnText ? 'border-accent/40' : 'border-tertiary'
          )}
          placeholder={`[Event "Casual Game"]\n[White "Player 1"]\n[Black "Player 2"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5...`}
          value={pgnText}
          onChange={(e) => setPgnText(e.target.value)}
          disabled={isProcessing}
        />
        {pgnText && (
          <Button
            onClick={() => setPgnText('')}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-tertiary hover:bg-accent/10 text-muted hover:text-accent flex items-center justify-center transition-colors text-xs"
          >
            <i className="fas fa-times" />
          </Button>
        )}
      </div>
      {pgnText && (
        <p className="mt-2 text-xs text-muted flex items-center gap-1.5">
          <i className="fas fa-check-circle text-green-500" />
          PGN detected — ready to analyze
        </p>
      )}
    </div>
  );
};

export default PgnPasteTab;
