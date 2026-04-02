import { Comment } from '@chess/components/PgnViewer';
import { useMemo } from 'react';

const InteractiveDefaultView = ({ moments }) => {
  const comment = useMemo(() => {
    if (!moments?.length) return null;
    for (const m of moments) {
      if (m?.comment) return m.comment;
    }
    return null;
  }, [moments]);

  if (!comment) return null;

  return (
    <div className="px-4 py-3">
      <div className="flex items-start gap-2.5">
        <i className="fa-solid fa-lightbulb text-amber-400 text-xs mt-1 flex-shrink-0" />
        <div id="pgn-comment" className="text-sm text-primary/80 leading-relaxed">
          <Comment comment={comment} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveDefaultView;
