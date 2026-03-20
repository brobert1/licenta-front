import { Time } from '@components';
import CourseNameCell from '@components/Professor/Courses/CourseNameCell';
import CourseTypeCell from '@components/Professor/Courses/CourseTypeCell';

export default [
  {
    Header: '#',
    accessor: 'no',
    extraClass: 'w-10',
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: CourseNameCell,
  },
  {
    Header: 'No. of lessons',
    accessor: 'countLessons',
  },
  {
    Header: 'Type',
    Cell: CourseTypeCell,
  },
  {
    Header: 'Created at',
    accessor: 'createdAt',
    Cell: Time,
  },
];
