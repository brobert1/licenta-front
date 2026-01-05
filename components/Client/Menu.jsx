import { NoSsr } from '@components';
import { useSwipeable } from '@hooks';
import { Logo, Pages } from '.';

const Menu = () => {
  const { inputRef, navRef, onTouchStart, onTouchMove, onTouchEnd } = useSwipeable();

  return (
    <NoSsr>
      <input
        type="checkbox"
        id="menu"
        className="hidden"
        aria-label="Menu open/close"
        ref={inputRef}
      />
      <label
        htmlFor="menu"
        aria-label="Menu open/close"
        className="backdrop bg-gray-300 fixed lg:hidden h-screen w-screen inset-0"
      />
      <nav
        className="nav-menu overflow-y-auto bg-dark xl:sticky xl:top-0 xl:overflow-y-visible"
        ref={navRef}
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => onTouchMove(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex flex-col lg:hidden p-4 gap-4">
          <Logo />
          <Pages />
        </div>
      </nav>
    </NoSsr>
  );
};

export default Menu;
