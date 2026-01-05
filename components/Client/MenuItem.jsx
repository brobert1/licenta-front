import { Link } from '@components';

const MenuItem = ({ href, children }) => {
  return (
    <div className="p-1 -m-1">
      <Link href={href} className="cursor-pointer font-semibold text-white">
        {children}
      </Link>
    </div>
  );
};

export default MenuItem;
