import { Price, Time } from '@components';
import OrderRow from './OrderRow';
import OrderStatusPill from './OrderStatusPill';

const OrderSummaryCard = ({ order, refundedAt }) => (
  <div className="bg-surface border border-border p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-base font-semibold text-primary">Order Summary</h2>
      <OrderStatusPill refundedAt={refundedAt} />
    </div>
    <div className="flex items-center gap-4 rounded-lg bg-secondary p-3">
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-border">
        <img
          src={order.course.image}
          alt={order.course.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="font-heading text-sm font-semibold text-primary truncate">
          {order.course.name}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="rounded-sm bg-accent px-1 py-0.5 text-[10px] font-bold text-white">
            {order.course.authorTitle}
          </span>
          <p className="text-xs text-muted">{order.course.authorName}</p>
        </div>
      </div>
    </div>
    <div>
      <OrderRow label="Amount">
        <span className="uppercase">
          {order.currency} <Price value={order.amount} precision={2} />
        </span>
      </OrderRow>
      <OrderRow label="Purchased on">
        <Time value={order.createdAt} />
      </OrderRow>
      <OrderRow label="Order ID">
        <span className="font-mono text-xs text-muted">{order._id}</span>
      </OrderRow>
    </div>
  </div>
);

export default OrderSummaryCard;
