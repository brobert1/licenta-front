import { Button } from '@components';
import AddStudyChapterForm from '@components/Forms/AddStudyChapterForm';
import { Modal } from 'react-bootstrap';

const AddStudyChapterModal = ({ hide, isOpen, data, isJustCreated, refetch }) => {
  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase font-semibold">New Chapter</h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-xmark text-lg text-white"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <AddStudyChapterForm
          hide={hide}
          chapter={data?.chapters[0]}
          isJustCreated={isJustCreated}
          refetch={refetch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddStudyChapterModal;
