import { classnames } from '@lib';

const OrderStatusPill = ({ compact = false, refundedAt }) => {
  return (
    <span
      className={classnames(
        'inline-flex items-center rounded-full border text-xs font-medium',
        compact ? 'px-2 py-0.5 gap-1' : 'px-3 py-1 gap-1.5',
        refundedAt
          ? 'border-red-500/30 bg-red-500/10 text-red-400'
          : 'border-green-500/30 bg-green-500/10 text-green-600'
      )}
    >
      {refundedAt ? (
        <>
          <i className="fa-regular fa-rotate-left text-[10px]" />
          Refunded
        </>
      ) : (
        <>
          <i className="fa-regular fa-circle-check text-[10px]" />
          Active
        </>
      )}
    </span>
  );
};

export default OrderStatusPill;
