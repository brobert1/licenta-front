import { logout } from '@api/identity';
import { Button, Link } from '@components';
import { useDisclosure, useOnClickOutside, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRef } from 'react';

const ProfileMenu = () => {
  const { hide } = useDisclosure();
  const { isPreview } = usePreview();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div
      className="absolute transition-all top-12 w-60 right-2 z-50 rounded-2xl
    bg-secondary shadow-2xl flex flex-col divide-y divide-tertiary"
    >
      <div className="p-2">
        <Button
          href="/client/account"
          className={classnames(
            'menu-button',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          <i className="fa-regular fa-gear"></i>
          <p>Settings</p>
        </Button>
        <Button
          href="/client/orders"
          className={classnames(
            'menu-button',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          <i className="fa-regular fa-sack-dollar"></i>
          <p>Orders</p>
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 p-2">
        <Link
          className={classnames(
            'menu-button justify-between',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
          target="_blank"
          href="/pricing"
        >
          <p>Pricing</p>
          <i className="fa-regular fa-arrow-up-right"></i>
        </Link>
        <Link
          className={classnames(
            'menu-button justify-between',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
          target="_blank"
          href="/support"
        >
          <p>Support</p>
          <i className="fa-regular fa-arrow-up-right"></i>
        </Link>
        <Button href="/client/chess-settings" className="menu-button justify-between">
          <p>Chess settings</p>
        </Button>
        <Button
          className={classnames(
            'menu-button',
            isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
          onClick={logout}
        >
          <p>Log out</p>
        </Button>
      </div>
      <div className="flex items-center justify-between p-4 text-grey">
        <div className="flex gap-2 text-xs">
          <Link href="/privacy-policy" target="_blank" className="link">
            Privacy
          </Link>
          <Link href="/terms-of-use" target="_blank" className="link">
            Terms
          </Link>
          <Link href="/cookie-policy" target="_blank" className="link">
            Cookies
          </Link>
        </div>
        <Link href="https://www.youtube.com/@AlexBanzea" target="_blank" className="link">
          <i className="fa-brands fa-youtube"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
