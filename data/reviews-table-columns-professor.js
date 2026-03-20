import { Time, Trim } from '@components';
import ReviewsActionCell from '@components/Professor/Reviews/ReviewsActionCell';

export default [
  {
    Header: '#',
    accessor: 'no',
  },
  {
    Header: 'Title',
    accessor: 'name',
  },
  {
    Header: 'Review',
    accessor: 'review',
    Cell: Trim,
  },
  {
    Header: 'User',
    accessor: 'user.name',
  },
  {
    Header: 'Course',
    accessor: 'course.name',
  },
  {
    Header: 'Created at',
    accessor: 'createdAt',
    Cell: Time,
  },
  {
    Header: '',
    accessor: 'actions',
    Cell: ReviewsActionCell,
  },
];
