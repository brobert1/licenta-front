import { Button, Link } from '@components';
import { useDisclosure, useLockBodyScroll, useOnClickOutside, usePreview } from '@hooks';
import { classnames } from '@lib';
import { useRef } from 'react';
import { ProfileButtonMobile } from '.';

const MobileLinks = () => {
  useLockBodyScroll();
  const { hide } = useDisclosure();
  const { isPreview } = usePreview();
  const { isOpen: isPlayDropdownOpen, toggle: togglePlayDropdown } = useDisclosure();

  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div
      ref={ref}
      className="z-50 flex w-full flex-col divide-y divide-tertiary border-tertiary border-t bg-primary p-4"
    >
      <ProfileButtonMobile />
      <Link
        className={classnames(
          'mt-4 flex justify-between p-4',
          isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        href="/client"
      >
        <p className="text-white">Dashboard</p>
        <i className="fa-regular fa-chevron-right text-white"></i>
      </Link>
      <div className={classnames('flex flex-col', isPreview && 'opacity-50 cursor-not-allowed')}>
        <Button
          className="flex justify-between p-4 text-left w-full"
          onClick={togglePlayDropdown}
          disabled={isPreview}
        >
          <p className="text-white">Play</p>
          <i
            className={classnames(
              'fa-regular',
              isPlayDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-right',
              'text-white transition-transform'
            )}
          ></i>
        </Button>
        {!isPreview && isPlayDropdownOpen && (
          <div className="pl-4 flex flex-col divide-y divide-tertiary/50">
            <Link
              className="flex items-center px-4 py-3 text-white/80 hover:text-white"
              href="/client/play"
            >
              <span>Play vs Bot</span>
            </Link>
            <Link
              className="flex items-center px-4 py-3 text-white/80 hover:text-white"
              href="/client/play/online"
            >
              <span>Play Online</span>
            </Link>
            <Link
              className="flex items-center px-4 py-3 text-white/80 hover:text-white"
              href="/client/play/history"
            >
              <span>Game History</span>
            </Link>
            <Link
              className="flex items-center px-4 py-3 text-white/80 hover:text-white"
              href="/client/play/stats"
            >
              <span>Game Stats</span>
            </Link>
          </div>
        )}
      </div>
      <Link className="flex justify-between p-4" href="/client/courses">
        <p className="text-white">Courses</p>
        <i className="fa-regular fa-chevron-right text-white"></i>
      </Link>
      <Link
        className={classnames(
          'flex justify-between p-4',
          isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        href="/client/studio"
      >
        <p className="text-white">Study</p>
        <i className="fa-regular fa-chevron-right text-white"></i>
      </Link>
    </div>
  );
};

export default MobileLinks;
