import { Link } from '@components';

const ClientsNameCell = ({
  row: {
    original: { _id },
  },
  value,
}) => {
  const clientUrl = `/admin/clients/${_id}/edit`;

  return (
    <Link
      className="font-medium text-primary hover:text-accent hover:underline hover:underline-offset-2"
      href={clientUrl}
    >
      {value}
    </Link>
  );
};

export default ClientsNameCell;
