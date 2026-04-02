import { useState, useEffect } from 'react';
import { Button } from '@components';
import { Textarea } from '@components/Fields';
import { addComment } from '@chess/functions';
import { removeComment } from '@functions/studio';
import { useDebounce } from '@hooks';

const Comments = ({ tree, current, setTree }) => {
  const [comment, setComment] = useState('');
  const debounce = useDebounce(comment, 500);

  useEffect(() => {
    if (current?.comment) {
      const normalizedComment = current.comment.replace(/\\n/g, '\n').replace(/\n{3,}/g, '\n\n');
      setComment(normalizedComment);
    } else {
      setComment('');
    }
  }, [current?.index]);

  useEffect(() => {
    if (current && debounce !== undefined) {
      const currentComment =
        current.comment?.replace(/\\n/g, '\n').replace(/\n{3,}/g, '\n\n') || '';
      if (debounce !== currentComment) {
        const normalizedComment = debounce.replace(/\n{3,}/g, '\n\n');
        const updatedTree = addComment(tree, current, normalizedComment);
        setTree(updatedTree);
      }
    }
  }, [debounce]);

  const handleClearComment = () => {
    if (current?.comment) {
      const updatedTree = removeComment(tree, current);
      setTree(updatedTree);
    }
    setComment('');
  };

  return (
    <div className="p-3">
      <div className="space-y-3">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-24 bg-tertiary text-primary border border-border rounded p-2 resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 whitespace-pre-wrap"
          placeholder="Add your comment for this move..."
        />
        <div className="flex justify-between items-center">
          <Button
            onClick={handleClearComment}
            className="px-3 py-2 text-xs bg-transparent text-muted hover:text-primary transition-colors duration-200"
            disabled={!comment.trim() && !current?.comment}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
