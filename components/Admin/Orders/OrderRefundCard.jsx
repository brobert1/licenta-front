import { Time } from '@components';
import OrderRow from './OrderRow';

const REFUND_STATUS_STYLES = {
  succeeded: 'border-green-500/30 bg-green-500/10 text-green-600',
  pending: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-600',
  failed: 'border-red-500/30 bg-red-500/10 text-red-400',
};

const formatReason = (reason) =>
  reason
    ?.split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') ?? null;

const OrderRefundCard = ({ refund }) => (
  <div className="bg-surface border border-red-200 p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
        <i className="fa-regular fa-rotate-left text-xs" />
      </div>
      <h2 className="font-heading text-base font-semibold text-primary">Refund Details</h2>
    </div>

    <div>
      <OrderRow label="Refunded on">
        <Time value={refund.refundedAt} />
      </OrderRow>
      <OrderRow label="Status">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
            REFUND_STATUS_STYLES[refund.refundStatus] ?? REFUND_STATUS_STYLES.pending
          }`}
        >
          {refund.refundStatus}
        </span>
      </OrderRow>
      {refund.refundReason && (
        <OrderRow label="Reason">{formatReason(refund.refundReason)}</OrderRow>
      )}
    </div>
  </div>
);

export default OrderRefundCard;
