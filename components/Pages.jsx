import { MenuItem } from '@components';
import { useProfile, useQuery } from '@hooks';

const ProfessorPages = () => {
  const { data, status } = useQuery('/professor/reviews/count');
  return (
    <>
      <MenuItem href="/professor" level="1">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-grid-2 flex w-4 justify-center"></i>
          <p>Dashboard</p>
        </div>
      </MenuItem>
      <MenuItem href="/professor/courses" level="1">
        <div className="flex items-center gap-3">
          <i className="fa-duotone fa-graduation-cap flex w-4 justify-center"></i>
          <p>Courses</p>
        </div>
      </MenuItem>
      <MenuItem href="/professor/reviews">
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

const AdminPages = () => (
  <MenuItem href="/admin" level="1">
    <div className="flex items-center gap-3">
      <i className="fa-duotone fa-grid-2 flex w-4 justify-center"></i>
      <p>Admin</p>
    </div>
  </MenuItem>
);

const Pages = () => {
  const { me } = useProfile();

  if (me?.role === 'admin') {
    return <AdminPages />;
  }

  return <ProfessorPages />;
};

export default Pages;
