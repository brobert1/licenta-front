import { ErrorLayout } from '@components/Admin';
import { useQuery } from '@hooks';
import OrderPageSkeleton from './OrderPageSkeleton';
import OrderPageContent from './OrderPageContent';

const OrderPage = ({ id }) => {
  const { data, status } = useQuery(`/admin/orders/${id}`);

  return (
    <article>
      {status === 'error' && <ErrorLayout />}
      {status === 'loading' && <OrderPageSkeleton />}
      {status === 'success' && <OrderPageContent data={data} />}
    </article>
  );
};

export default OrderPage;
