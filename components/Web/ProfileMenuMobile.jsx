import { logout } from '@api/identity';
import { Button } from '@components';

const ProfileMenuMobile = () => {
  return (
    <div className="mt-4 flex flex-col divide-y divide-tertiary bg-secondary rounded-2xl shadow-md">
      <div className="p-2">
        <Button href="/client/account" className="menu-button">
          <i className="fa-regular fa-gear"></i>
          <p>Settings</p>
        </Button>
        <Button href="/client/orders" className="menu-button">
          <i className="fa-regular fa-sack-dollar"></i>
          <p>Orders</p>
        </Button>
        <Button className="menu-button" onClick={logout}>
          <i className="fa-regular fa-right-from-bracket"></i>
          <p>Log out</p>
        </Button>
      </div>
    </div>
  );
};

export default ProfileMenuMobile;
