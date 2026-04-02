import { Bone } from '@components';
import { TableHeader } from '@components/Tables';
import { bogus } from '@lib';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const TableLoading = ({ name, columns }) => {
  const options = {
    columns: useMemo(() => columns, []),
    data: useMemo(() => [], []),
  };
  const table = useTable(options);

  const items = bogus.make(name);
  const showRows = (item, i) => {
    return (
      <tr key={`${name}-${i}`}>
        {table.visibleColumns.map((column, j) => (
          <td key={`${name}-${i}-${j}`} className="whitespace-nowrap p-4">
            <Bone type="loading" extraClass={column?.extraClass} />
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <table className="w-full border-collapse" {...table.getTableProps()}>
        <TableHeader headers={table.visibleColumns} />
        <tbody className="divide-y divide-border whitespace-nowrap text-sm" {...table.getTableBodyProps()}>
          {items.map(showRows)}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoading;
