import { logout } from '@api/identity';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';

const ProfileMenu = () => {
  const { hide } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <ul className="bg-secondary flex flex-col py-2 shadow-2xl rounded-2xl">
      <li>
        <button className="flex items-center px-4 py-2 text-white no-underline" onClick={logout}>
          <i className="fas fa-sign-out-alt w-6"></i>
          Logout
        </button>
      </li>
    </ul>
  );
};

export default ProfileMenu;
