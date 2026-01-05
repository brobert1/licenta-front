import { useDisclosure, useOnClickOutside, useQuery } from '@hooks';
import { useRef } from 'react';
import { ProfileLoading, ProfileMenu, ProfileSuccess } from '.';

const ProfileButton = () => {
  const { data, status } = useQuery('/client/account');

  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <div
        className="hidden lg:flex items-center space-x-2 cursor-pointer"
        onClick={toggle}
        role="button"
      >
        <div className="flex items-center gap-2">
          {status === 'loading' && <ProfileLoading />}
          {status === 'success' && (
            <>
              <ProfileSuccess {...data} />
              {data?.image?.path ? (
                <img
                  src={data?.image.path}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
                  <i className="fas fa-user text-lg text-white"></i>
                </div>
              )}
            </>
          )}
        </div>
        {isOpen ? (
          <i className="fas fa-chevron-up text-gray-600"></i>
        ) : (
          <i className="fas fa-chevron-down text-gray-600"></i>
        )}
      </div>
      {isOpen && <ProfileMenu />}
    </div>
  );
};

export default ProfileButton;
