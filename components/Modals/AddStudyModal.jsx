import { Button } from '@components';
import { AddStudyForm } from '@components/Forms';
import { Modal } from 'react-bootstrap';

const AddStudyModal = ({ courseId, courseName, hide, isOpen }) => {
  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase font-semibold">Add Study</h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-xmark text-lg text-white"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <AddStudyForm hide={hide} courseId={courseId} courseName={courseName} />
      </Modal.Body>
    </Modal>
  );
};

export default AddStudyModal;
