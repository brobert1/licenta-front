import { Menu, MenuButton, PreviewBanner, Profile } from '@components';
import { usePreview } from '@hooks';
import { classnames } from '@lib';
import ClientHeader from './Client/ClientHeader';
import { GuestHeader } from './Guest';
import SaleBanner from './Visitor/SaleBanner';

const HEADERS = {
  client: ClientHeader,
  guest: GuestHeader,
};

const Layout = ({ children, title, variant, wide }) => {
  const { isPreview } = usePreview();
  if (variant === 'admin') {
    return (
      <div className="flex min-h-screen bg-secondary font-body text-sm text-primary">
        <Menu />
        <main className="flex-1 w-full min-w-0 max-w-full gap-4 p-4 lg:col-span-5 lg:p-8 xl:px-12">
          <div className="mb-12 flex items-center">
            <div className="flex flex-1">
              <h3 className="text-2xl font-semibold text-primary">{title}</h3>
            </div>
            <Profile />
            <MenuButton />
          </div>
          <div className="grid gap-4">{children}</div>
        </main>
      </div>
    );
  }

  if (variant === 'immersive') {
    return (
      <div className="min-h-screen bg-secondary">
        <main className="min-h-screen">{children}</main>
      </div>
    );
  }

  const Header = HEADERS[variant] || GuestHeader;

  const shell = (
    <>
      <SaleBanner variant={variant} />
      <Header wide={wide} />
      <main
        className={classnames(
          'mx-auto max-w-5xl px-4 pt-4 pb-10 lg:px-6 lg:pt-8',
          wide && 'xl:max-w-9xl',
          isPreview && 'pb-16'
        )}
      >
        {children}
      </main>
      {isPreview && <PreviewBanner />}
    </>
  );

  return <div className="min-h-screen bg-secondary">{shell}</div>;
};

export default Layout;
