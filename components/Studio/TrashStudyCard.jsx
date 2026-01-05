import { deleteStudy, restoreStudy } from '@api/client';
import { ActionModal, Button, Plural } from '@components';
import { ago } from '@functions';
import { useDisclosure, useMutation } from '@hooks';

const TrashStudyCard = ({ _id: uuid, name, icon, color, deletedAt, chapters, refetch }) => {
  const { hide, isOpen, show } = useDisclosure();

  const restoreMutation = useMutation(restoreStudy, {
    successCallback: () => {
      refetch();
    },
  });

  const deleteMutation = useMutation(deleteStudy, {
    successCallback: () => {
      refetch();
      hide();
    },
  });

  const handleRestore = async () => {
    await restoreMutation.mutateAsync(uuid);
  };
  const handleDelete = async () => {
    await deleteMutation.mutateAsync(uuid);
  };

  return (
    <>
      <div className="bg-secondary rounded-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
              style={{ backgroundColor: color }}
            >
              <i className={icon}></i>
            </div>
            <div>
              <h3 className="text-white font-medium text-sm line-clamp-1">{name}</h3>
              <p className="text-gray-400 text-xs">
                <Plural one="chapter" many="chapters" count={chapters?.length || 0} />
              </p>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-gray-400 text-xs">
            <i className="fa-solid fa-trash mr-1"></i>
            Deleted {ago(deletedAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRestore}
            disabled={restoreMutation.isLoading}
            className="button full accent text-xs flex-1"
          >
            <i className="fa-solid fa-undo mr-1"></i>
            Restore
          </Button>
          <Button
            onClick={show}
            disabled={deleteMutation.isLoading}
            className="button full delete text-xs flex-1"
          >
            <i className="fa-solid fa-trash mr-1"></i>
            Delete
          </Button>
        </div>
      </div>
      {isOpen && (
        <ActionModal
          confirmText="Delete"
          hide={hide}
          isLoading={deleteMutation.isLoading}
          isOpen={isOpen}
          onConfirm={handleDelete}
          title="Confirm permanent deletion"
          variant="danger"
        >
          <p className="text-white">
            Are you sure you want to permanently delete the study <strong>{name}</strong>?
          </p>
          <p className="text-gray-400 text-sm mt-2">
            This action cannot be undone and the study will be lost forever.
          </p>
        </ActionModal>
      )}
    </>
  );
};

export default TrashStudyCard;
