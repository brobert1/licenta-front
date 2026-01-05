import { clientRemoveAccount } from '@api/client';

import { ActionModal, Button } from '@components';
import { useDisclosure, useMutation } from '@hooks';

const DeleteAccountModal = () => {
  const { hide, isOpen, show } = useDisclosure();

  const mutation = useMutation(clientRemoveAccount, {
    redirectOnSuccess: '/login',
  });

  return (
    <>
      <Button className="text-red-600 hover:underline font-semibold" onClick={show}>
        Delete
      </Button>
      {isOpen && (
        <ActionModal
          confirmText="Delete"
          hide={hide}
          isLoading={mutation.isLoading}
          isOpen={isOpen}
          onConfirm={mutation.mutateAsync}
          title="Confirm account deletion"
          variant="danger"
        >
          <p className="text-white">
            Deleting your account is permanent and cannot be undone. You will lose all your
            progress, enrolled courses, and any saved data. Are you sure you want to proceed?
          </p>
        </ActionModal>
      )}
    </>
  );
};

export default DeleteAccountModal;
