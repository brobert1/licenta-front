import { Link } from '@components';

const Logo = (props) => {
  return (
    <Link href="/" className="text-white z-20" {...props}>
      <h2 className="flex cursor-pointer gap-3 items-center font-bold text-xl lg:text-3xl">
        <img src="/images/logo.png" className="w-14 h-14" alt="Rook'n'Learn" />
        <span>Rook'n'Learn</span>
      </h2>
    </Link>
  );
};

export default Logo;
