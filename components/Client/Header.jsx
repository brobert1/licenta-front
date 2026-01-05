import { MenuButton } from '@components';
import { ProfileButton } from '@components/Web';
import { Menu } from '.';

const Header = () => {
  return (
    <header className="w-full bg-primary p-4">
      <nav className="max w-full flex items-center justify-between lg:mb-12">
        <Menu />
        <ProfileButton />
        <MenuButton />
      </nav>
    </header>
  );
};

export default Header;
