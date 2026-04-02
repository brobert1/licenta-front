import { Button } from '@components';
import { Textarea } from '@components/Fields';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const AddCommentModal = ({ hide, isOpen, moment, onAddComment }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isOpen && moment) {
      setComment(moment.comment || '');
    } else if (!isOpen) {
      setComment('');
    }
  }, [isOpen, moment]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsLoading(true);
    try {
      await onAddComment(comment.trim());
      hide();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      centered={true}
      contentClassName="modal-theme-light"
    >
      <Modal.Header className="flex items-center w-full justify-between border-b border-border">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold text-primary">
            Add Comment
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-x text-primary"></i>
        </Button>
      </Modal.Header>
      <Modal.Body id="comment-modal">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
          className="w-full h-32 p-3 bg-tertiary text-primary rounded border border-border focus:border-accent focus:outline-none resize-none"
          disabled={isLoading}
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-2">
        <Button
          className="button full accent font-semibold text-base"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <i className="fas fa-comment mr-2"></i>
          Add Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCommentModal;
