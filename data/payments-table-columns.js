import { AmountCell, Time } from '@components';
import { OrderStatusCell } from '@components/Admin';

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
    Cell: AmountCell,
  },
  {
    Header: 'Bought on',
    accessor: 'createdAt',
    Cell: Time,
  },
  {
    Header: 'Status',
    accessor: 'refundedAt',
    Cell: OrderStatusCell,
  },
];
