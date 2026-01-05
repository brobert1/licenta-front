import { Link, Logo } from '@components';

const Header = () => {
  return (
    <div className="flex w-full">
      <div className="max w-full py-6 flex items-center justify-between">
        <Logo />
        <div className="flex gap-8 items-center">
          <div className="hidden lg:flex gap-8 text-white font-semibold text-lg">
            <Link href="/courses">
              <p>Courses</p>
            </Link>
            <p>Watch</p>
            <p>Learn</p>
            <p>Pricing</p>
            <Link
              href="/login"
              className="button px-8 py-2 border-0 full accent rounded-full font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
