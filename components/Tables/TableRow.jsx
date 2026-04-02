import React from 'react';

const TableRow = ({ row, refetch, onRowClick }) => {
  const clickable = Boolean(onRowClick);

  return (
    <tr
      className={`hover:bg-secondary transition-colors ${clickable ? 'cursor-pointer' : ''}`}
      onClick={clickable ? () => onRowClick(row.original) : undefined}
      {...row.getRowProps()}
    >
      {row.cells.map((cell) => {
        return (
          <td
            key={cell}
            className="px-6 py-4 whitespace-nowrap text-sm text-primary"
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
