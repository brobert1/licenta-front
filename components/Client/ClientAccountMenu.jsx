import logout from '@api/logout';
import { Link } from '@components';

const ClientAccountMenu = () => {
  return (
    <div className="flex flex-col text-white rounded-lg bg-secondary p-4 shadow">
      <Link href="/client/profile">
        <div className="group flex justify-between border-b border-grey py-2 hover:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex w-7 items-center justify-center rounded bg-tertiary p-1.5 text-white">
              <i className="fa-solid fa-user"></i>
            </div>
            <p>Account</p>
          </div>
          <i className="fa-solid fa-chevron-right mt-1 text-sm text-gray-400"></i>
        </div>
      </Link>
      <Link href="/client/profile/password">
        <div className="group flex justify-between border-b border-grey py-2 hover:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex w-7 items-center justify-center rounded bg-tertiary p-1.5 text-white">
              <i className="fa-solid fa-lock"></i>
            </div>
            <p>Password</p>
          </div>
          <i className="fa-solid fa-chevron-right mt-1 text-sm text-gray-400"></i>
        </div>
      </Link>
      <div
        className="group flex cursor-pointer justify-between py-2 hover:text-gray-400"
        onClick={logout}
      >
        <div className="flex items-center gap-2">
          <div className="flex w-7 items-center justify-center rounded bg-tertiary p-1.5 text-red-500">
            <i className="fa-solid fa-power-off"></i>
          </div>
          <p>Logout</p>
        </div>
        <i className="fa-solid fa-chevron-right mt-1 text-sm text-gray-400"></i>
      </div>
    </div>
  );
};

export default ClientAccountMenu;
