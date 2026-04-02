import OrderStatusPill from './Orders/OrderStatusPill';

const OrderStatusCell = ({ value: refundedAt }) => (
  <OrderStatusPill refundedAt={refundedAt} compact />
);

export default OrderStatusCell;
