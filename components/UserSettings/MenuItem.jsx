import { Link } from '@components';
import { classnames } from '@lib';
import { useRouter } from 'next/router';

const MenuItem = ({ href, children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Link
      href={href}
      className={classnames(
        'flex items-center gap-1.5 font-bold pb-1.5 hover:text-white lg:border-0 w-fit',
        pathname === href && 'text-white border-white border-b-2'
      )}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
