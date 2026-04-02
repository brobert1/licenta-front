import { isEmpty } from 'lodash';
import OrderCard from './OrderCard';

const OrdersListSuccess = ({ activeTab, data }) => {
  const orders = data.pages
    .flat()
    .filter((order) => order.course)
    .filter((order) => (activeTab === 'Active' ? !order.refundedAt : Boolean(order.refundedAt)));

  const emptyMessage = activeTab === 'Active' ? 'No active orders' : 'No refunded orders';

  return (
    <div className="flex flex-col gap-4 w-full">
      {isEmpty(orders) && (
        <div className="mt-8 flex flex-col items-center justify-center gap-5 text-muted w-full">
          <i className="fa-thin fa-chess-queen text-7xl"></i>
          <div className="flex flex-col items-center">
            <p className="text-base">{emptyMessage}</p>
          </div>
        </div>
      )}
      {orders.map((order, i) => (
        <OrderCard key={`order-${order._id}-${i}`} order={order} />
      ))}
    </div>
  );
};

export default OrdersListSuccess;
