import { LoadMoreOnClick } from '@components/Buttons';
import { CoursesListSkeleton } from '@components/Course';
import { Tabs } from '@components';
import { useQuery } from '@hooks';
import { useState } from 'react';
import OrdersListSuccess from './OrdersListSuccess';

const ORDERS_TABS = ['Active', 'Refunded'];

const OrdersList = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const { data, status, ...props } = useQuery('/client/orders');

  return (
    <>
      <Tabs activeTab={activeTab} className="mb-6" onChange={setActiveTab} tabs={ORDERS_TABS} />
      {status === 'loading' && <CoursesListSkeleton type="loading" />}
      {status === 'error' && <CoursesListSkeleton type="error" />}
      {status === 'success' && (
        <>
          <OrdersListSuccess activeTab={activeTab} data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default OrdersList;
