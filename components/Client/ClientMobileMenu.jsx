import { Link } from '@components';
import { useDisclosure, useLockBodyScroll, useOnClickOutside, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRef } from 'react';
import { ProfileButton } from '@components/Web';

const ClientMobileMenu = ({ onClose }) => {
  useLockBodyScroll();
  const { isPreview } = usePreview();
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  const navLink = (href, icon, children) => (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface hover:bg-surface-container-high font-landing font-medium"
    >
      <i className={`fa-regular ${icon} w-5 text-center`} />
      <span>{children}</span>
    </Link>
  );

  return (
    <div
      ref={ref}
      className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-container-low border-r border-outline-variant/20 shadow-xl flex flex-col"
    >
      <div className="p-6 border-b border-outline-variant/20">
        <Link
          href="/client"
          onClick={onClose}
          className={classnames(
            'flex items-center gap-2',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          <img src="/images/logo.png" className="w-10 h-10" alt="Rook 'n Learn" />
          <span className="font-headline text-xl text-on-surface">Rook 'n Learn</span>
        </Link>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-4">
          Executive Lounge
        </p>
        <nav className="flex flex-col gap-1">
          {navLink('/client', 'fa-grid-2', 'Dashboard')}
          {navLink('/client/play', 'fa-robot', 'Play')}
          {navLink('/client/courses', 'fa-graduation-cap', 'Courses')}
          {navLink('/client/studio', 'fa-book-open', 'Study')}
        </nav>
      </div>
      <div className="p-4 border-t border-outline-variant/20">
        <ProfileButton variant="light" />
      </div>
    </div>
  );
};

export default ClientMobileMenu;
