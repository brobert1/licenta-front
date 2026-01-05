import { isEmpty } from 'lodash';
import { ProfileCourseCard } from '.';

const EnrolledCoursesList = ({ courses = [] }) => {
  const count = courses.length;
  if (isEmpty(courses)) {
    return (
      <div className="flex flex-col mt-4 gap-5 rounded-lg bg-secondary p-6 shadow">
        <h2 className="text-lg text-white font-semibold">{`Enrolled courses ${count}`}</h2>
        <p className="text-sm text-gray-400">No courses enrolled yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 gap-5 rounded-lg bg-secondary p-6 shadow">
      <h2 className="text-lg text-white font-semibold">{`Enrolled courses (${count})`}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <ProfileCourseCard
            key={course._id}
            _id={course._id}
            name={course.name}
            description={course.description}
            image={course.image.path}
            author={course.author}
            tags={course.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesList;
