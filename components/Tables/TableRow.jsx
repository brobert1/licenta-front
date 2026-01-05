import React from 'react';

const TableRow = ({ row, refetch }) => {
  return (
    <tr className="hover:bg-neutral-750 transition-colors" {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <td
            key={cell}
            className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300"
            {...cell.getCellProps()}
          >
            {cell.render('Cell', { refetch })}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
