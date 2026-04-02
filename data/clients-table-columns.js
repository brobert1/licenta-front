import Time from '@components/Time';
import ClientsNameCell from '@components/Admin/Clients/ClientsNameCell';

export default [
  {
    Header: '#',
    accessor: 'no',
    extraClass: 'w-10',
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ClientsNameCell,
  },
  {
    Header: 'E-mail',
    accessor: 'email',
  },
  {
    Header: 'Created at',
    accessor: 'createdAt',
    Cell: Time,
  }
];
