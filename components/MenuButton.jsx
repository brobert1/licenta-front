import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';
import { MobileMenu } from './Web';

const MenuButton = () => {
  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div className="lg:hidden" ref={ref}>
      <div className="cursor-pointer items-center space-x-2" onClick={toggle} role="button">
        <i className="fas fa-bars text-xl text-white"></i>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[70px] z-50 flex w-full shadow-2xl">
          <MobileMenu />
        </div>
      )}
    </div>
  );
};

export default MenuButton;
