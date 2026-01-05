import { MenuItem } from '@components';
import { useQuery } from '@hooks';

const Pages = () => {
  const { data, status } = useQuery('/admin/reviews/count');
  return (
    <>
      <MenuItem href="/admin" level="1">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-grid-2 flex w-4 justify-center"></i>
          <p>Dashboard</p>
        </div>
      </MenuItem>
      <MenuItem href="/admin/courses" level="1">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-graduation-cap flex w-4 justify-center"></i>
          <p>Courses</p>
        </div>
      </MenuItem>
      <MenuItem href="/admin/clients" level="1">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-user flex w-4 justify-center"></i>
          <p>Clients</p>
        </div>
      </MenuItem>
      <MenuItem href="/admin/reviews">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-star flex w-4 justify-center"></i>
          <p className="flex items-center gap-1">
            Reviews
            {status === 'success' && data > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-xs text-gray-500">
                {data}
              </span>
            )}
          </p>
        </div>
      </MenuItem>
    </>
  );
};

export default Pages;
