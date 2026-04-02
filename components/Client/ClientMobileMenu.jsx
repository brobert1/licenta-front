import { useEffect, useState } from 'react';
import { Button, Link } from '@components';
import { logout } from '@api/identity';
import { usePreview } from '@hooks';
import { classnames } from '@lib';

const QUICK_LINKS = [
  { href: '/client/profile', icon: 'fa-user', label: 'Profile', type: 'link' },
  { href: '/client/orders', icon: 'fa-receipt', label: 'Orders', type: 'link' },
  { href: null, icon: 'fa-arrow-right-from-bracket', label: 'Log out', type: 'button' },
];

const NAV_LINKS = [
  { href: '/client', label: 'Dashboard' },
  { href: '/client/play', label: 'Play online' },
  { href: '/client/play/bot', label: 'Play vs Bot' },
];

const ClientMobileMenu = ({ hide, user, isPreview }) => {
  const [visible, setVisible] = useState(false);
  const { isPreview: previewHook } = usePreview();
  const disabled = isPreview || previewHook;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(hide, 200);
  };

  return (
    <div
      className={classnames(
        'fixed inset-0 z-[9999] transition-colors duration-200 lg:hidden',
        visible ? 'bg-primary/50' : 'bg-transparent'
      )}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onClick={close}
    >
      <div
        className={classnames(
          'absolute inset-x-0 top-0 bg-surface shadow-lg transition-transform duration-200',
          visible ? 'translate-y-0' : '-translate-y-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end px-6 pt-4">
          <Button
            onClick={close}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted hover:text-primary"
          >
            <i className="fas fa-xmark text-sm"></i>
          </Button>
        </div>
        <div className="flex items-center gap-3 border-b border-border px-6 pb-5 pt-3">
          {user?.image?.path ? (
            <img
              src={user.image.path}
              alt={user.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
              <i className="fas fa-user text-white"></i>
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-semibold text-primary">{user?.name}</p>
            <p className="truncate text-sm text-muted">{user?.email}</p>
          </div>
        </div>
        <div className="border-b border-border px-6 py-3">
          {QUICK_LINKS.map(({ href, icon, label, type }) =>
            type === 'button' ? (
              <button
                key={label}
                onClick={disabled ? undefined : logout}
                className={classnames(
                  'flex w-full items-center gap-3 py-3 text-left text-primary',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                <i className={`fas ${icon} w-5 text-muted`}></i>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ) : (
              <Link
                key={label}
                href={href}
                className={classnames(
                  'flex items-center gap-3 py-3 text-primary hover:text-accent',
                  disabled && 'cursor-not-allowed opacity-60 pointer-events-none'
                )}
              >
                <i className={`fas ${icon} w-5 text-muted`}></i>
                <span className="text-sm font-medium">{label}</span>
              </Link>
            )
          )}
        </div>
        <div className="px-6 py-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={classnames(
                'flex items-center justify-between py-3 text-primary hover:text-accent',
                disabled && 'cursor-not-allowed opacity-60 pointer-events-none'
              )}
            >
              <span className="text-sm font-medium">{label}</span>
              <i className="fas fa-chevron-right text-grey text-xs"></i>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMobileMenu;
