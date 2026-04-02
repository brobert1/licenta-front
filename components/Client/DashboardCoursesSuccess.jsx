import { GuestCourseCard } from '@components/Guest';
import { isEmpty } from 'lodash';

const DashboardCoursesSuccess = ({ data }) => {
  const courses = data?.pages?.flat() || [];

  if (isEmpty(courses)) {
    return (
      <div className="rounded-2xl bg-secondary p-6 text-center text-muted">
        <p className="text-sm">No courses available yet.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {courses.map((course) => (
        <li key={course._id}>
          <GuestCourseCard basePath="/client/courses" {...course} />
        </li>
      ))}
    </ul>
  );
};

export default DashboardCoursesSuccess;
