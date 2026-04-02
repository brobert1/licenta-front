import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { coursesTableColumns } from '@data';
import { useInfiniteQuery } from '@hooks';

const CoursesTable = ({ options }) => {
  const { data, status, refetch, ...props } = useInfiniteQuery('/admin/courses', options);

  return (
    <>
      {status === 'error' && <TableError name="courses" columns={coursesTableColumns} />}
      {status === 'loading' && <TableLoading name="courses" columns={coursesTableColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={coursesTableColumns}
            data={data}
            name="courses"
            refetch={refetch}
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

export default CoursesTable;
