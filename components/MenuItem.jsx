import { Link } from '@components';
import { classnames } from '@lib';
import { useRouter } from 'next/router';

const MenuItem = ({ href, children, level = 1 }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Link
      href={href}
      className={classnames(
        'text-base cursor-pointer py-1.5 hover:bg-secondary mx-4 rounded-lg my-0.5',
        'text-primary/90 no-underline',
        level == 1 ? 'pl-4' : 'pl-12',
        pathname === href && 'font-semibold text-primary bg-secondary'
      )}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
