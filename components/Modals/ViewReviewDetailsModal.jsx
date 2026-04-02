import { Button, StarRating } from '@components';
import { Modal } from 'react-bootstrap';

const ViewReviewDetailsModal = ({
  data,
  disableDelete,
  disableApprove,
  handleApprove,
  handleDelete,
  hide,
  isOpen,
}) => {
  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold text-primary">
            {data.course.name}
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-x text-primary"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-primary">{data.user.name}</h3>
          <StarRating value={data.rating} readOnly={true} />
        </div>
        <p className="font-bold text-primary">{data.name}</p>
        <p className="text-primary">{data.review}</p>
      </Modal.Body>
      <Modal.Footer className="flex justify-end border-t border-border">
        <div className="flex gap-2">
          <Button
            className="button full delete flex items-center gap-2"
            disabled={disableDelete}
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash-alt"></i>
            <p>Delete</p>
          </Button>
          <Button
            className="button full accent flex items-center gap-2"
            onClick={handleApprove}
            disabled={disableApprove}
          >
            <i className="fa-solid fa-check"></i>
            <p>Approve</p>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewReviewDetailsModal;
