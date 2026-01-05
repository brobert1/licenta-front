import { classnames } from '@lib';

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-neutral-900 border-b border-neutral-700">
      <tr>
        {headers.map((column) => (
          <th
            key={column.Header}
            className={classnames(
              'px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider',
              column?.extraClass
            )}
          >
            {column.render('Header')}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
