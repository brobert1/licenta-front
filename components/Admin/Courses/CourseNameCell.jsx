import { Link } from '@components';

const CourseNameCell = ({
  row: {
    original: { _id },
  },
  value,
}) => {
  const courseUrl = `/admin/courses/${_id}`;

  return (
    <Link
      className="font-medium text-primary hover:text-accent hover:underline hover:underline-offset-2"
      href={courseUrl}
    >
      {value}
    </Link>
  );
};

export default CourseNameCell;
