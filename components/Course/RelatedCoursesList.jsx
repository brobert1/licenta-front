import { Link, Plural } from '@components';
import { slugify } from '@functions';

const RelatedCourseCard = ({ _id: uuid, image, lessonsCount, name }) => {
  return (
    <Link href={`/client/courses/${slugify(name, uuid)}`}>
      <div className="flex lg:flex-row flex-col bg-secondary hover:bg-tertiary cursor-pointer p-1.5 lg:p-2 rounded-lg gap-4">
        <img src={image} alt={name} className="w-20 h-20 object-cover rounded" />
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-medium">{name}</h2>
          </div>
          <div className="flex items-center gap-2 text-grey text-sm">
            <i className="fa-regular fa-graduation-cap w-4"></i>
            <Plural count={lessonsCount} one="Lesson" many="Lessons" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const RelatedCoursesList = ({ courses }) => {
  return (
    <>
      {courses.length > 0 && (
        <div className="col-span-2 flex flex-col gap-4">
          {courses.map((course) => (
            <RelatedCourseCard
              key={course._id}
              _id={course._id}
              image={course.image.path}
              lessonsCount={course.lessons.length}
              name={course.name}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RelatedCoursesList;
