import { deleteCourse } from '@api/admin';
import { ActionModal } from '@components';
import { useMutation } from '@hooks';

const DeleteCourseModal = ({ courseId, courseName, hide, isOpen, variant }) => {
  const mutation = useMutation(deleteCourse, {
    invalidateQueries: '/admin/courses',
    redirectOnSuccess: '/admin/courses',
    successCallback: hide,
  });

  const handleDelete = () => {
    return mutation.mutateAsync(courseId);
  };

  return (
    <ActionModal
      cancelText="Back"
      confirmText="Delete"
      hide={hide}
      isLoading={mutation.isLoading}
      isOpen={isOpen}
      onConfirm={handleDelete}
      title="Delete confirmation"
      variant={variant}
    >
      <p className="text-white">
        Are you sure you want to delete <strong>{courseName}</strong>?
      </p>
    </ActionModal>
  );
};

export default DeleteCourseModal;
