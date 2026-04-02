import { useDisclosure, useOnClickOutside, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRef } from 'react';
import { MobileMenu } from './Web';

const MenuButton = () => {
  const { isOpen, hide, toggle } = useDisclosure();
  const { isPreview } = usePreview();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div className="lg:hidden" ref={ref}>
      <div
        className={classnames(
          'cursor-pointer items-center space-x-2',
          isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        onClick={toggle}
        role="button"
      >
        <i className="fas fa-bars text-xl text-primary"></i>
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
