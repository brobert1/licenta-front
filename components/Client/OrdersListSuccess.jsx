import { isEmpty } from 'lodash';
import OrderCard from './OrderCard';

const OrdersListSuccess = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isEmpty(data.pages.flat()) && (
        <div className="mt-8 flex flex-col items-center justify-center gap-5 text-gray-400 w-full">
          <i className="fa-thin fa-chess-queen text-7xl"></i>
          <div className="flex flex-col items-center">
            <p className="text-base">No orders found</p>
          </div>
        </div>
      )}
      {data.pages.flat().map((order, i) => {
        return <OrderCard key={`order-${i}`} order={order} />;
      })}
    </div>
  );
};

export default OrdersListSuccess;
