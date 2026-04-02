import { Button } from '@components';
import { ClientChangePasswordForm } from '@components/Forms';
import { Modal } from 'react-bootstrap';

const ChangePasswordModal = ({ hide, isOpen }) => {
  return (
    <Modal
      contentClassName="modal-theme-light"
      show={isOpen}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="flex items-center w-full justify-between border-b border-tertiary">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold text-primary">
            Update Password
          </h3>
        </Modal.Title>
        <Button
          className="modal-close-icon -mr-2 flex h-8 w-8 items-center justify-center p-2"
          onClick={hide}
        >
          <i className="fa-solid fa-x"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <ClientChangePasswordForm />
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
