import { Menu, MenuButton, Profile } from '@components';

const Layout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen bg-primary font-body text-sm">
      <Menu />
      <main className="max w-full gap-4 lg:col-span-5">
        <div className="mb-4 p-4 bg-primary lg:px-8 xl:px-8 flex items-center">
          <div className="flex flex-1">
            <h3 className="text-2xl text-white font-semibold">{title}</h3>
          </div>
          <Profile />
          <MenuButton />
        </div>
        <div className="grid gap-4 p-4 lg:p-4 xl:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
