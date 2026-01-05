import { deleteClient } from '@api/admin';
import { ActionModal, Button } from '@components';
import ActionButton from '@components/Buttons/ActionButton';
import { useDisclosure, useMutation } from '@hooks';
import { isFunction } from 'lodash';

const DeleteClientButton = ({ type = 'icon', refetch, hide: hideModal = () => {}, client }) => {
  const { hide, isOpen, show } = useDisclosure();

  const deleteMutation = useMutation(deleteClient, {
    successCallback: async () => {
      await refetch();
      hide();
      if (isFunction(hideModal)) {
        hideModal();
      }
    },
  });

  const handleDelete = () => deleteMutation.mutateAsync(client._id);

  return (
    <>
      {type === 'icon' ? (
        <ActionButton
          icon="fa-regular fa-trash text-red-600"
          tooltipText="Delete client"
          onClick={show}
        />
      ) : (
        <Button className="button full secondary delete" onClick={show}>
          <i className="fa-solid fa-xmark"></i>
          <p>Delete client</p>
        </Button>
      )}
      {isOpen && (
        <ActionModal
          confirmText="Delete"
          hide={hide}
          isLoading={deleteMutation.isLoading}
          isOpen={isOpen}
          onConfirm={handleDelete}
          title="Confirm client deletion"
          variant="danger"
        >
          <p className="text-white">
            Are you sure you want to delete user <strong>{client.name}</strong>?
          </p>
        </ActionModal>
      )}
    </>
  );
};

export default DeleteClientButton;
