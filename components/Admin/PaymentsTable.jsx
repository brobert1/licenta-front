import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { paymentsTableColumns } from '@data';
import { useInfiniteQuery } from '@hooks';
import { useRouter } from 'next/router';

const PaymentsTable = ({ options }) => {
  const { data, status, ...props } = useInfiniteQuery('/admin/payments', options);
  const router = useRouter();

  const handleRowClick = (order) => router.push(`/admin/orders/${order._id}`);

  return (
    <>
      {status === 'error' && <TableError name="payments" columns={paymentsTableColumns} />}
      {status === 'loading' && <TableLoading name="payments" columns={paymentsTableColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={paymentsTableColumns}
            data={data}
            name="payments"
            onRowClick={handleRowClick}
            {...props}
          />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default PaymentsTable;
