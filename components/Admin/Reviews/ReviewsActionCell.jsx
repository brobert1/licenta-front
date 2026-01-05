import { approveReview, deleteReview } from '@api/admin';
import { ActionButton } from '@components/Buttons';
import ViewReviewDetailsModal from '@components/Modals/ViewReviewDetailsModal';
import { useDisclosure, useMutation } from '@hooks';
import { useCallback } from 'react';

const ReviewsActionCell = ({ refetch, row }) => {
  const { hide, isOpen, show } = useDisclosure();

  const approveMutation = useMutation(approveReview, {
    invalidateQueries: '/admin/reviews/count',
    successCallback: async () => {
      await refetch();
      hide();
    },
  });

  const deleteMutation = useMutation(deleteReview, {
    invalidateQueries: '/admin/reviews/count',
    successCallback: async () => {
      await refetch();
      hide();
    },
  });

  const handleShow = useCallback(() => {
    show();
  }, [show]);

  const handleDelete = useCallback(() => {
    return deleteMutation.mutateAsync(row.original._id);
  }, [row.original._id, deleteMutation]);

  const handleApprove = useCallback(() => {
    return approveMutation.mutateAsync(row.original._id);
  }, [row.original._id, approveMutation]);

  return (
    <div className="relative flex gap-2">
      <ActionButton icon="fa-regular fa-eye" onClick={handleShow} tooltipText="See review" />
      {isOpen && (
        <ViewReviewDetailsModal
          data={row.original}
          handleApprove={handleApprove}
          disableDelete={deleteMutation.isLoading}
          disableApprove={approveMutation.isLoading}
          handleDelete={handleDelete}
          hide={hide}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default ReviewsActionCell;
