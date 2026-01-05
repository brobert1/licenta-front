import { Time } from '@components';

export default [
  {
    Header: '#',
    accessor: 'no',
    extraClass: 'w-10',
  },
  {
    Header: 'Course',
    accessor: 'course.name',
  },
  {
    Header: 'Client',
    accessor: 'identity.name',
  },
  {
    Header: 'Amount (EUR)',
    accessor: 'amount',
  },
  {
    Header: 'Bought on',
    accessor: 'createdAt',
    Cell: Time,
  },
];
