import { refundOrder } from '@api/client';
import { ActionModal } from '@components';
import { RadioGroup, Textarea } from '@components/Fields';
import { useMutation } from '@hooks';
import { useState } from 'react';
import RefundReasonRadio from './RefundReasonRadio';

const REFUND_REASONS = [
  { value: 'not_as_expected', label: 'Content not as expected' },
  { value: 'bought_by_mistake', label: 'Bought by mistake' },
  { value: 'technical_issues', label: 'Technical issues' },
  { value: 'too_expensive', label: 'Too expensive' },
  { value: 'other', label: 'Other' },
];

const RefundModal = ({ courseName, isOpen, onClose, orderId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const mutation = useMutation(refundOrder, {
    invalidateQueries: '/client/orders',
    successCallback: () => {
      onClose();
      setSelectedReason('');
      setOtherReason('');
    },
  });

  const handleConfirm = () => {
    mutation.mutate({
      orderId,
      reason: (selectedReason === 'other' ? otherReason.trim() : selectedReason) || null,
    });
  };

  const handleHide = () => {
    if (mutation.isLoading) return;
    onClose();
    setSelectedReason('');
    setOtherReason('');
  };

  return (
    <ActionModal
      cancelText="Cancel"
      confirmText="Submit Refund"
      hide={handleHide}
      isLoading={mutation.isLoading}
      isOpen={isOpen}
      onConfirm={handleConfirm}
      title="Request a refund"
      variant="warning"
    >
      <div className="admin-form flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-muted">
          You are requesting a refund for{' '}
          <strong className="font-semibold text-primary">{courseName}</strong>. Your access to the
          course will be removed immediately.
        </p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <div className="flex gap-3">
            <i className="fa-regular fa-clock mt-0.5 flex-shrink-0 text-amber-600" />
            <p className="leading-relaxed text-justify">
              Refunds are processed instantly. The amount will be returned to your original payment
              method within 5–10 business days depending on your bank.
            </p>
          </div>
        </div>
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-primary">Reason</legend>
          <RadioGroup
            className="flex flex-col gap-2"
            name="refund-reason"
            onChange={setSelectedReason}
            selectedValue={selectedReason}
          >
            {REFUND_REASONS.map(({ value, label }) => (
              <RefundReasonRadio
                key={value}
                disabled={mutation.isLoading}
                label={label}
                value={value}
              />
            ))}
          </RadioGroup>
          {selectedReason === 'other' && (
            <div className="mt-1 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-primary" htmlFor="refund-other-reason">
                Please specify
              </label>
              <Textarea
                disabled={mutation.isLoading}
                id="refund-other-reason"
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Describe your reason..."
                rows={3}
                value={otherReason}
              />
            </div>
          )}
        </fieldset>
      </div>
    </ActionModal>
  );
};

export default RefundModal;
