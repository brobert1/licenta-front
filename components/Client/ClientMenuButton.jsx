import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';
import ClientMobileMenu from './ClientMobileMenu';

const ClientMenuButton = () => {
  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div className="lg:hidden" ref={ref}>
      <button
        type="button"
        onClick={toggle}
        className="p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors"
        aria-label="Open menu"
      >
        <i className="fas fa-bars text-xl" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={hide} aria-hidden />
          <ClientMobileMenu onClose={hide} />
        </>
      )}
    </div>
  );
};

export default ClientMenuButton;
