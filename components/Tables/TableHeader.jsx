import { classnames } from '@lib';

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-secondary border-b border-border">
      <tr>
        {headers.map((column) => (
          <th
            key={column.Header}
            className={classnames(
              'px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider',
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
