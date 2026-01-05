import { MenuButton, PreviewBanner } from '@components';
import { ProfileButton } from '@components/Web';
import { usePreview } from '@hooks';
import { classnames } from '@lib';
import { Logo, MenuLinks } from '.';

const Layout = ({ children, type }) => {
  const { isPreview } = usePreview();

  return (
    <div className="min-h-screen bg-primary w-full">
      {isPreview && <PreviewBanner />}
      <div
        className={classnames(
          'max-w-lg md:max-w-6xl mx-auto px-0 text-xs 2xl:text-sm',
          type === 'large' && '2xl:max-w-9xl'
        )}
      >
        <header className="w-full px-2 py-2.5 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Logo />
            <MenuLinks />
          </nav>
          <ProfileButton />
          <MenuButton />
        </header>
        <main className="w-full px-4">
          <div className="flex items-center justify-center w-full pb-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
