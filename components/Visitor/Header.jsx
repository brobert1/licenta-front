import { Button, Link, Logo } from '@components';
import { SaleBanner } from '@components/Visitor';

const Header = () => {
  return (
    <>
      <SaleBanner />
      <div className="flex border-b w-full lg:py-6 lg:px-8 p-4">
        <div className="max-visitor w-full flex items-center justify-between max-w-6xl mx-auto">
          <Logo className="text-black mb-3" />
          <div className="flex gap-8 items-center">
            <div className="hidden lg:flex gap-8 font-semibold text-lg">
              <Link className="hover:underline hover:text-primary" href="/courses">
                <p>Courses</p>
              </Link>
              <Link className="hover:underline hover:text-primary" href="/watch">
                <p>Watch</p>
              </Link>
              <Link className="hover:underline hover:text-primary" href="/learn">
                <p>Learn</p>
              </Link>
              <Link className="hover:underline hover:text-primary" href="/pricing">
                <p>Pricing</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <Button
                href="/login"
                className="button full primary rounded-full font-semibold text-base"
              >
                Login
              </Button>
              <Button
                href="/signup"
                className="hidden lg:flex button full accent rounded-full font-semibold text-base"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
