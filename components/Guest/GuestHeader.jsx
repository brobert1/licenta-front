import { Link, Logo } from '@components';

const GuestHeader = () => {
  return (
    <header className="border-b border-border bg-surface">
      <div className="h-1 w-full bg-accent" />
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        <div className="flex items-center justify-between py-3">
          <Logo className="shrink-0" />
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="inline-flex h-9 items-center px-1.5 text-muted text-xs sm:h-10 sm:px-2 sm:text-sm leading-none"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-lg bg-accent px-3 font-medium text-white text-xs sm:h-10 sm:px-4 sm:text-sm leading-none"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default GuestHeader;
