import { TableHeader, TableRow } from '@components/Tables';
import { isEmpty, size } from 'lodash';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const TableSuccess = ({ name, columns, data, dataUpdatedAt, refetch = () => {} }) => {
  const pages = data.pages.flat();
  const options = {
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => pages, [dataUpdatedAt]),
  };
  const table = useTable(options);

  return (
    <div className="bg-secondary rounded-lg border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" {...table.getTableProps()}>
          <TableHeader headers={table.visibleColumns} />
          <tbody className="divide-y divide-white/10" {...table.getTableBodyProps()}>
            {table.rows.map((row, i) => {
              table.prepareRow(row);
              return <TableRow key={`${name}-row-${i}`} row={row} refetch={refetch} />;
            })}
            {isEmpty(table.rows) && (
              <tr>
                <td className="px-6 py-4 text-grey" colSpan={size(columns)}>
                  Nothing to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSuccess;
