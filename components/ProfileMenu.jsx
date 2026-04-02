import { logout } from '@api/identity';
import { Button } from '@components';

const ProfileMenu = () => {
  return (
    <ul className="flex flex-col p-2">
      <li>
        <Button
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-primary no-underline transition-colors hover:bg-secondary"
          onClick={logout}
        >
          <i className="fas fa-sign-out-alt w-6"></i>
          Logout
        </Button>
      </li>
    </ul>
  );
};

export default ProfileMenu;
