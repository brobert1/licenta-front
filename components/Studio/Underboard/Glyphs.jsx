import { useState, useEffect } from 'react';
import { Button } from '@components';
import { momentAnnotations } from '@chess/constants/moment-annotations';
import { parseExistingAnnotations } from '@chess/functions';
import { addAnnotation } from '@chess/functions';
import { AnnotationGroup } from '@chess/components/PgnEditor';

const Glyphs = ({ tree, current, setTree }) => {
  const [selectedAnnotations, setSelectedAnnotations] = useState({
    moves: null,
    evaluation: null,
    symbols: null,
  });

  useEffect(() => {
    if (current) {
      const selected = parseExistingAnnotations(current, momentAnnotations);
      setSelectedAnnotations(selected);
    } else {
      setSelectedAnnotations({ moves: null, evaluation: null, symbols: null });
    }
  }, [current?.index]);

  const handleAnnotationSelect = (category, annotation) => {
    const currentAnnotation = selectedAnnotations[category];
    const isSame =
      (currentAnnotation?.suffix && currentAnnotation.suffix === annotation?.suffix) ||
      (currentAnnotation?.nag && currentAnnotation.nag === annotation?.nag);

    const newSelection = {
      ...selectedAnnotations,
      [category]: isSame ? null : annotation,
    };

    if (category === 'evaluation' && !isSame) {
      newSelection.symbols = null;
    } else if (category === 'symbols' && !isSame) {
      newSelection.evaluation = null;
    }

    setSelectedAnnotations(newSelection);

    if (current) {
      const updatedTree = addAnnotation(tree, current, newSelection);
      setTree(updatedTree);
    }
  };

  const handleClearAnnotations = () => {
    if (current) {
      const emptyAnnotations = { moves: null, evaluation: null, symbols: null };
      const updatedTree = addAnnotation(tree, current, emptyAnnotations);
      setTree(updatedTree);
      setSelectedAnnotations(emptyAnnotations);
    }
  };

  const hasAnnotations = Object.values(selectedAnnotations).some(Boolean);

  return (
    <div className="p-3">
      {current?.move ? (
        <div className="space-y-4">
          <AnnotationGroup
            title="NAGs for moves"
            annotations={momentAnnotations.moves}
            selectedAnnotation={selectedAnnotations.moves}
            onSelect={(annotation) => handleAnnotationSelect('moves', annotation)}
          />
          <AnnotationGroup
            title="NAGs for evaluation"
            annotations={momentAnnotations.evaluation}
            selectedAnnotation={selectedAnnotations.evaluation}
            onSelect={(annotation) => handleAnnotationSelect('evaluation', annotation)}
          />
          <AnnotationGroup
            title="Other symbols"
            annotations={momentAnnotations.symbols}
            selectedAnnotation={selectedAnnotations.symbols}
            onSelect={(annotation) => handleAnnotationSelect('symbols', annotation)}
          />
          {hasAnnotations && (
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <Button
                onClick={handleClearAnnotations}
                className="px-3 py-1 text-xs bg-transparent text-gray-400 hover:text-white transition-colors duration-200"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <i className="fas fa-chess text-2xl mb-2 block"></i>
          <p>Select a move to annotate</p>
        </div>
      )}
    </div>
  );
};

export default Glyphs;
