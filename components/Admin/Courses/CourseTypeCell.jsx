const CourseTypeCell = ({
  row: {
    original: { isPaid, active },
  },
}) => {
  let label = 'Unknown';

  if (!active) {
    label = 'Unpublished';
  } else if (isPaid) {
    label = 'Paid';
  } else {
    label = 'Free';
  }

  return <span className="font-medium text-white">{label}</span>;
};

export default CourseTypeCell;
