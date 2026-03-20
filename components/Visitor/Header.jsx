import { Button, Link, Logo } from '@components';
import { SaleBanner } from '@components/Visitor';

const Header = () => {
  return (
    <>
      <SaleBanner />
      <header className="flex border-b border-gray-200 w-full py-4 lg:py-6 lg:px-8 px-4 bg-white">
        <div className="max-w-6xl w-full flex items-center justify-between mx-auto">
          <Logo className="text-black mb-0" />
          <nav className="flex gap-8 items-center">
            <div className="hidden lg:flex gap-8 font-sans font-medium text-base text-gray-700">
              <Link className="hover:text-black transition-colors" href="/courses">
                Courses
              </Link>
              <Link className="hover:text-black transition-colors" href="/about">
                About
              </Link>
              <Link className="hover:text-black transition-colors" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-black transition-colors" href="/support">
                Support
              </Link>
            </div>
            <div className="flex gap-3">
              <Button
                href="/login"
                className="font-sans font-semibold text-base px-5 py-2 rounded border-2 border-black text-black hover:bg-gray-50 transition-colors"
              >
                Login
              </Button>
              <Button
                href="/signup"
                className="hidden lg:inline-flex font-sans font-semibold text-base px-5 py-2 rounded bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
