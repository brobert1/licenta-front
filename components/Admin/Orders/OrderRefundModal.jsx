import { refundOrder } from '@api/admin';
import { ActionModal } from '@components';
import { useMutation } from '@hooks';

const OrderRefundModal = ({ orderId, courseName, isOpen, onClose }) => {
  const mutation = useMutation(() => refundOrder(orderId), {
    invalidateQueries: `/admin/orders/${orderId}`,
    successCallback: onClose,
  });

  return (
    <ActionModal
      title="Refund Order"
      confirmText="Confirm Refund"
      cancelText="Cancel"
      variant="danger"
      isOpen={isOpen}
      hide={onClose}
      isLoading={mutation.isLoading}
      onConfirm={() => mutation.mutate()}
    >
      <p className="text-sm leading-relaxed text-muted text-justify">
        You are about to refund the order for{' '}
        <strong className="font-semibold text-primary">{courseName}</strong>. The customer&apos;s
        access will be revoked immediately and the payment will be returned within 5–10 business
        days.
      </p>
      <p className="mt-3 text-sm font-medium text-red-500 text-justify">
        This action cannot be undone.
      </p>
    </ActionModal>
  );
};

export default OrderRefundModal;
