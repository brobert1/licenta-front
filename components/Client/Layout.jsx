import { PreviewBanner } from '@components';
import { useRouter } from 'next/router';
import { usePreview } from '@hooks';
import { classnames } from '@lib';
import { ClientMenuButton, Sidebar } from '.';

const Layout = ({ children }) => {
  const { isPreview } = usePreview();
  const router = useRouter();
  const currentPath = router?.pathname || '';

  return (
    <div className="min-h-screen bg-surface w-full">
      {isPreview && <PreviewBanner />}
      <Sidebar currentPath={currentPath} />
      <div
        className={classnames(
          'lg:ml-64 min-h-screen',
          'px-10 py-6 text-xs 2xl:text-sm'
        )}
      >
        <div className="flex justify-end lg:hidden mb-4">
          <ClientMenuButton />
        </div>
        <main className="w-full pb-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
