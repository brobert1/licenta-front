import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { paymentsTableColumns } from '@data';
import { useInfiniteQuery } from '@hooks';

const PaymentsTable = ({ options }) => {
  const { data, status, ...props } = useInfiniteQuery('/admin/payments', options);

  return (
    <>
      {status === 'error' && <TableError name="payments" columns={paymentsTableColumns} />}
      {status === 'loading' && <TableLoading name="payments" columns={paymentsTableColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess columns={paymentsTableColumns} data={data} name="payments" {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default PaymentsTable;
