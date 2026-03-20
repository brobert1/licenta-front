import { Link } from '@components';
import logout from '@api/logout';
import { usePreview, useQuery } from '@hooks';
import { classnames } from '@lib';

const SidebarNavLink = ({ href, icon, children, active }) => (
  <Link
    href={href}
    className={classnames(
      'flex items-center gap-3 px-4 py-2.5 rounded-lg font-landing font-medium transition-colors',
      active
        ? 'bg-tertiaryGold/10 text-tertiaryGold'
        : 'text-on-surface hover:bg-surface-container-high'
    )}
  >
    <i className={`fa-regular ${icon} w-5 text-center`} />
    <span>{children}</span>
  </Link>
);

const SidebarBottomLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-landing font-medium text-secondary-muted hover:bg-surface-container-high hover:text-on-surface transition-colors"
  >
    <i className={`fa-regular ${icon} w-5 text-center`} />
    <span>{children}</span>
  </Link>
);

const UserCard = () => {
  const { data, status } = useQuery('/client/account');

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {data?.image?.path ? (
        <img
          src={data.image.path}
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high flex-shrink-0">
          <i className="fa-regular fa-user text-sm text-on-surface" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {status === 'loading' ? (
          <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse mb-1" />
        ) : (
          <p className="font-landing font-semibold text-sm text-on-surface truncate">
            {data?.name || 'User'}
          </p>
        )}
        {status === 'loading' ? (
          <div className="h-2.5 w-32 bg-surface-container-high rounded animate-pulse" />
        ) : (
          <p className="font-landing text-xs text-secondary-muted truncate">{data?.email}</p>
        )}
      </div>
      <button onClick={logout} className="text-secondary-muted hover:text-on-surface transition-colors flex-shrink-0">
        <i className="fa-regular fa-arrow-right-from-bracket text-sm" />
      </button>
    </div>
  );
};

const Sidebar = ({ currentPath = '' }) => {
  const { isPreview } = usePreview();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-surface-container-low border-r border-outline-variant/20">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-outline-variant/20">
          <Link
            href="/client"
            className={classnames(
              'flex items-center gap-2',
              isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
          >
            <img src="/images/logo.png" className="w-10 h-10" alt="Rook 'n Learn" />
            <span className="font-headline text-xl text-on-surface">Rook 'n Learn</span>
          </Link>
        </div>

        {/* Main nav */}
        <div className="px-4 py-6">
          <p className="text-xs font-landing font-bold text-secondary-muted uppercase tracking-widest mb-4">
            Executive Lounge
          </p>
          <nav className="flex flex-col gap-1">
            <SidebarNavLink href="/client" icon="fa-grid-2" active={currentPath === '/client'}>
              Dashboard
            </SidebarNavLink>
            <SidebarNavLink
              href="/client/play"
              icon="fa-robot"
              active={currentPath.startsWith('/client/play')}
            >
              Play
            </SidebarNavLink>
            <SidebarNavLink
              href="/client/courses"
              icon="fa-graduation-cap"
              active={currentPath.startsWith('/client/courses')}
            >
              Courses
            </SidebarNavLink>
            <SidebarNavLink
              href="/client/studio"
              icon="fa-book-open"
              active={currentPath.startsWith('/client/studio')}
            >
              Study
            </SidebarNavLink>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-2 pb-4">
          {/* Global Lobby banner */}
          <div className="mx-4 mb-2 px-4 py-3 bg-surface-container rounded-xl border border-outline-variant/20">
            <p className="text-xs font-landing font-bold text-tertiaryGold uppercase tracking-widest mb-1">
              Global Lobby
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-2xl text-on-surface">12,402</span>
              <span className="font-landing text-sm text-secondary-muted">Players Active</span>
            </div>
          </div>

          {/* Settings & Support */}
          <div className="px-4 flex flex-col gap-1">
            <SidebarBottomLink href="/client/settings" icon="fa-gear">
              Settings
            </SidebarBottomLink>
            <SidebarBottomLink href="/client/support" icon="fa-circle-question">
              Support
            </SidebarBottomLink>
          </div>

          {/* User card */}
          <div className="mx-4 mt-2 border-t border-outline-variant/20 pt-3">
            <UserCard />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
