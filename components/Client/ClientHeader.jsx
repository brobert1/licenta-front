import { useRef } from 'react';
import { Button, Logo } from '@components';
import { useDisclosure, useOnClickOutside, usePreview, useQuery } from '@hooks';
import { classnames } from '@lib';
import ClientMobileMenu from './ClientMobileMenu';
import ClientProfileMenu from './ClientProfileMenu';

const ClientHeader = ({ wide }) => {
  const { data, status } = useQuery('/client/account');
  const { isPreview } = usePreview();
  const { isOpen, toggle, hide } = useDisclosure();
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, hide);

  return (
    <header className="border-b border-border bg-surface">
      <div className="h-1 w-full bg-accent" />
      <div className={classnames('mx-auto max-w-5xl px-4 lg:px-6', wide && 'xl:max-w-9xl')}>
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Logo />
          </div>
          <div ref={menuRef} className="relative shrink-0">
            <Button
              onClick={toggle}
              disabled={status !== 'success' || isPreview}
              className={classnames(
                'flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-left',
                (status !== 'success' || isPreview) && 'cursor-not-allowed opacity-70'
              )}
            >
              {data?.image?.path ? (
                <img
                  src={data.image.path}
                  alt={data?.name}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                  <i className="fas fa-user text-white"></i>
                </div>
              )}
              <span className="truncate text-sm font-medium text-primary">{data?.name}</span>
              <i
                className={classnames(
                  'fas fa-chevron-down text-xs text-grey transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </Button>
            {isOpen && status === 'success' && (
              <div className="absolute right-0 top-full z-50 mt-2 hidden w-64 rounded-xl bg-surface shadow-lg ring-1 ring-border lg:block">
                <ClientProfileMenu isPreview={isPreview} user={data} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && status === 'success' && (
        <ClientMobileMenu hide={hide} isPreview={isPreview} user={data} />
      )}
    </header>
  );
};

export default ClientHeader;
