import { LoadMoreOnClick } from '@components/Buttons';
import { CoursesListSkeleton } from '@components/Course';
import { useQuery } from '@hooks';
import OrdersListSuccess from './OrdersListSuccess';

const OrdersList = () => {
  const { data, status, ...props } = useQuery('/client/orders');

  return (
    <>
      {status === 'loading' && <CoursesListSkeleton type="loading" />}
      {status === 'error' && <CoursesListSkeleton type="error" />}
      {status === 'success' && (
        <>
          <OrdersListSuccess data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default OrdersList;
