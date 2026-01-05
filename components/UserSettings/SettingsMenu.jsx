import { MenuItem } from '.';

const SettingsMenu = () => {
  return (
    <div className="flex lg:flex-col lg:gap-2.5 gap-4 text-grey">
      <MenuItem href="/client/account">
        <i className="lg:block hidden fa-regular fa-user w-5"></i>
        <p>Account</p>
      </MenuItem>
      <MenuItem href="#">
        <i className="lg:block hidden fa-regular fa-credit-card w-5"></i>
        <p>Plan & Billing</p>
      </MenuItem>
      <MenuItem href="#">
        <i className="lg:block hidden fa-regular fa-envelope w-5"></i>
        <p>Newsletter</p>
      </MenuItem>
    </div>
  );
};

export default SettingsMenu;
