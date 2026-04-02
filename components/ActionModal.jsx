import { Button } from '@components';
import { classnames } from '@lib';
import Modal from 'react-bootstrap/Modal';

const variants = {
  danger: {
    confirmClass: 'border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600',
    iconColor: 'bg-red-100 text-red-600',
    icon: 'fa-regular fa-triangle-exclamation',
  },
  primary: {
    confirmClass: 'border-primary bg-primary text-white hover:bg-primary/90',
    iconColor: 'bg-primary text-white',
    icon: 'fa-regular fa-info-circle',
  },
  success: {
    confirmClass: 'border-green-500 bg-green-500 text-white',
    iconColor: 'bg-green-100 text-green-600',
    icon: 'fa-regular fa-check-circle',
  },
  warning: {
    confirmClass: 'border-yellow-500 bg-yellow-500 text-black',
    iconColor: 'bg-yellow-100 text-yellow-600',
    icon: 'fa-regular fa-exclamation-circle',
  },
};

export const ActionFooter = ({
  cancelText = 'Cancel',
  confirmDisabled = false,
  confirmText = 'Delete',
  hide,
  isLoading,
  onConfirm = () => {},
  variant = 'danger',
}) => {
  const { confirmClass } = variants[variant] || variants['danger'];

  return (
    <div className="flex justify-end gap-4">
      <Button
        className="button full border border-border bg-secondary text-primary hover:bg-tertiary"
        disabled={isLoading}
        onClick={hide}
      >
        {cancelText}
      </Button>
      <div className="flex items-center">
        <Button
          className={classnames('button full', confirmClass)}
          disabled={isLoading || confirmDisabled}
          onClick={onConfirm}
          type="submit"
        >
          {confirmText}
        </Button>
        {isLoading && <img src="/icons/loading.gif" alt="loading" className="mx-1 w-6" />}
      </div>
    </div>
  );
};

const ActionModal = ({
  cancelText,
  children,
  confirmDisabled = false,
  confirmText,
  contentClassName = 'modal-theme-light',
  hide,
  isLoading,
  isOpen,
  onConfirm,
  showFooter = true,
  title = 'Confirm operation',
  variant = 'danger',
}) => {
  const { iconColor, icon } = variants[variant] || variants['danger'];

  return (
    <Modal
      contentClassName={contentClassName}
      show={isOpen}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="flex items-center justify-between border-b border-border">
        <Modal.Title>
          <div className="flex items-center gap-2 leading-tight">
            <div
              className={classnames(
                'flex aspect-square h-8 w-8 items-center justify-center rounded-full',
                iconColor
              )}
            >
              <i className={icon}></i>
            </div>
            {title}
          </div>
        </Modal.Title>
        <Button
          className="modal-close-icon -mr-2 flex h-8 w-8 items-center justify-center p-2"
          disabled={isLoading}
          onClick={hide}
        >
          <img src="/icons/xmark.svg" alt="close" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="max-w-full break-words">{children}</div>
      </Modal.Body>
      {showFooter && (
        <Modal.Footer>
          <ActionFooter
            cancelText={cancelText}
            confirmDisabled={confirmDisabled}
            confirmText={confirmText}
            hide={hide}
            isLoading={isLoading}
            onConfirm={onConfirm}
            variant={variant}
          />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ActionModal;
