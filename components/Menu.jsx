import { Link, Pages } from '@components';
import { useSwipeable } from '@hooks';

const Menu = () => {
  const { inputRef, navRef, onTouchStart, onTouchMove, onTouchEnd } = useSwipeable();

  return (
    <>
      <input type="checkbox" id="menu" className="hidden" ref={inputRef} />
      <label
        htmlFor="menu"
        className="backdrop fixed inset-0 h-screen w-screen bg-gray-300 lg:hidden"
      />
      <nav
        className="nav-menu border-r border-tertiary bg-primary"
        ref={navRef}
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => onTouchMove(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex flex-col py-8 h-screen overflow-y-auto lg:sticky lg:top-0">
          <div className="px-8 pb-12">
            <Link href="/" className="flex cursor-pointer items-center text-white text-xl">
              <img src="/images/logo.png" className="w-10 h-10 mr-3 -ml-1" alt="Rook'n'Learn" />
              <p className="font-semibold text-lg md:text-xl">Rook'n'Learn</p>
            </Link>
          </div>
          <Pages />
        </div>
      </nav>
    </>
  );
};

export default Menu;
