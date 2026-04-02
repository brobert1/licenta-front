import { logout } from '@api/identity';
import { Button, Link } from '@components';
import { classnames } from '@lib';

const QUICK_LINKS = [
  { href: '/client/profile', icon: 'fa-user', label: 'Profile' },
  { href: '/client/orders', icon: 'fa-receipt', label: 'Orders' },
];

const NAV_LINKS = [
  { href: '/client', label: 'Dashboard' },
  { href: '/client/play', label: 'Play' },
];

const FOOTER_LINKS = [
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-of-use', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookies' },
];

const ClientProfileMenu = ({ user, isPreview }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-5 py-4">
        {user?.image?.path ? (
          <img
            alt={user.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            src={user.image.path}
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white">
            <i className="fas fa-user text-white"></i>
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary">{user?.name}</p>
          <p className="truncate text-xs text-muted">{user?.email}</p>
        </div>
      </div>
      <div className="border-b border-border px-5 pb-3 font-semibold">
        {QUICK_LINKS.map(({ href, icon, label }) => (
          <Link
            key={label}
            href={href}
            className={classnames(
              'flex items-center gap-2 rounded-lg py-2 text-sm text-primary hover:text-accent',
              isPreview && 'cursor-not-allowed opacity-60 pointer-events-none'
            )}
          >
            <i className={`fas ${icon} w-5 text-muted`}></i>
            {label}
          </Link>
        ))}
      </div>
      <div className="border-b border-border px-5 py-3">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={classnames(
              'flex items-center justify-between rounded-lg py-2 text-sm text-primary hover:text-accent',
              isPreview && 'cursor-not-allowed opacity-60 pointer-events-none'
            )}
          >
            {label}
            <i className="fas fa-chevron-right text-grey text-xs"></i>
          </Link>
        ))}
      </div>
      <div className="border-b border-border px-5 py-3">
        <Button
          onClick={logout}
          className={classnames(
            'flex items-center gap-2 rounded-lg py-2 text-sm text-primary hover:text-accent',
            isPreview && 'cursor-not-allowed opacity-60 pointer-events-none'
          )}
        >
          <i className="fas fa-arrow-right-from-bracket w-5 text-muted"></i>
          Log out
        </Button>
      </div>
      <div className="flex items-center gap-3 px-5 py-3">
        {FOOTER_LINKS.map(({ href, label }) => (
          <Link key={label} href={href} className="text-xs text-muted hover:text-primary">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientProfileMenu;
