import { useDisclosure, useOnClickOutside, useQuery } from '@hooks';
import { useRef } from 'react';
import { ProfileLoading, ProfileMenu, ProfileSuccess } from '.';

const ProfileButton = ({ variant = 'dark' }) => {
  const { data, status } = useQuery('/client/account');

  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  const chevronClass = variant === 'light' ? 'text-secondary-muted' : 'text-gray-600';
  const avatarBgClass = variant === 'light' ? 'bg-surface-container-high' : 'bg-tertiary';
  const avatarIconClass = variant === 'light' ? 'text-on-surface' : 'text-white';

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <div
        className="hidden lg:flex items-center space-x-2 cursor-pointer"
        onClick={toggle}
        role="button"
      >
        <div className="flex items-center gap-2">
          {status === 'loading' && <ProfileLoading variant={variant} />}
          {status === 'success' && (
            <>
              <ProfileSuccess {...data} variant={variant} />
              {data?.image?.path ? (
                <img
                  src={data?.image.path}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${avatarBgClass}`}>
                  <i className={`fas fa-user text-lg ${avatarIconClass}`}></i>
                </div>
              )}
            </>
          )}
        </div>
        {isOpen ? (
          <i className={`fas fa-chevron-up ${chevronClass}`}></i>
        ) : (
          <i className={`fas fa-chevron-down ${chevronClass}`}></i>
        )}
      </div>
      {isOpen && <ProfileMenu />}
    </div>
  );
};

export default ProfileButton;
