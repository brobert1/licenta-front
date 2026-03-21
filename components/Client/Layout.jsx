import { PreviewBanner } from '@components';
import { MultiplayerProvider } from '@contexts/MultiplayerContext';
import { useRouter } from 'next/router';
import { usePreview } from '@hooks';
import { classnames } from '@lib';
import { ClientMenuButton, Sidebar } from '.';

const Layout = ({ children, type }) => {
  const { isPreview } = usePreview();
  const router = useRouter();
  const currentPath = router?.pathname || '';
  const isSmall = type === 'small';

  return (
    <MultiplayerProvider>
      <div className="min-h-screen bg-surface w-full">
        {isPreview && <PreviewBanner />}
        <Sidebar currentPath={currentPath} />
        <div
          className={classnames(
            'lg:ml-64',
            isSmall ? 'h-screen overflow-hidden' : 'min-h-screen px-10 py-6 text-xs 2xl:text-sm'
          )}
        >
          {!isSmall && (
            <div className="flex justify-end lg:hidden mb-4">
              <ClientMenuButton />
            </div>
          )}
          <main className={classnames('w-full', isSmall ? 'h-full' : 'pb-6')}>{children}</main>
        </div>
      </div>
    </MultiplayerProvider>
  );
};

export default Layout;
