import { Button } from '@components';
import { ClientEditInfoForm } from '@components/Forms';
import { Modal } from 'react-bootstrap';

const EditClientInfoModal = ({ client, hide, isOpen }) => {
  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold">
            Edit details
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-x text-white"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <ClientEditInfoForm client={client} hide={hide} />
      </Modal.Body>
    </Modal>
  );
};

export default EditClientInfoModal;
