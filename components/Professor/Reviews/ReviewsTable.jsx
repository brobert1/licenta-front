import { LoadMoreOnClick } from '@components/Buttons';
import { TableColumns, TableError, TableLoading, TableSuccess } from '@components/Tables';
import { useInfiniteQuery } from '@hooks';
import reviewsTableColumns from '@data/reviews-table-columns-professor';

const ReviewsTable = ({ options }) => {
  const { data, status, ...props } = useInfiniteQuery('/professor/reviews', options);

  return (
    <>
      <TableColumns pageParams={data?.pageParams} />
      {status === 'error' && <TableError name="reviews" columns={reviewsTableColumns} />}
      {status === 'loading' && <TableLoading name="reviews" columns={reviewsTableColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess columns={reviewsTableColumns} data={data} name="reviews" {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default ReviewsTable;
