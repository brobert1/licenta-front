import { ProfileLoading, ProfileMenu, ProfileSuccess } from '@components';
import { useDisclosure, useOnClickOutside, useProfile } from '@hooks';
import { useRef } from 'react';

const Profile = () => {
  const { status, me } = useProfile();

  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <div
        className="hidden py-2 px-4 rounded-lg cursor-pointer items-center space-x-2 md:flex bg-surface border border-border"
        onClick={toggle}
        role="button"
      >
        <div className="flex items-center gap-2">
          {status === 'loading' && <ProfileLoading />}
          {status === 'success' && <ProfileSuccess {...me} />}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <i className="fas fa-user text-lg text-white"></i>
          </div>
        </div>
        {isOpen ? (
          <i className="fas fa-chevron-up text-grey"></i>
        ) : (
          <i className="fas fa-chevron-down text-grey"></i>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-14 right-2 z-50 w-56 rounded-lg bg-surface shadow-xl ring-1 ring-border">
          <ProfileMenu />
        </div>
      )}
    </div>
  );
};

export default Profile;
