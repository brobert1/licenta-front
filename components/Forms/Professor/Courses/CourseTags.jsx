import CourseTagsArray from '@components/Fields/Admin/Courses/CourseTagsArray';

const CoursesTags = () => {
  return (
    <div className="bg-secondary w-full p-4 lg:rounded-lg lg:p-6 h-full">
      <h2 className="border-b pb-2 text-white text-lg font-semibold">Tags</h2>
      <div className="mt-4">
        <CourseTagsArray
          name="tags"
          placeholder="Course tags"
          charactersLimit={50}
          elementLimit={20}
        />
      </div>
    </div>
  );
};

export default CoursesTags;
