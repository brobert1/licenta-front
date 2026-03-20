import { Form, HookForm, Submit } from '@components/HookForm';
import { courseValidationSchema, courseInitialValues } from '@models/admin/course';
import { updateCourse } from '@api/professor';
import { useMutation } from '@hooks';
import { toaster } from '@lib';
import CourseInfo from '@components/Fields/Admin/Courses/CourseInfo';
import CourseThumbnailCard from './CourseThumbnailCard';
import CourseSettings from './CourseSettings';
import CoursePricing from './CoursePricing';

const EditCourseFormSuccess = ({ data }) => {
  const mergedCourseData = { ...courseInitialValues, ...data };

  const mutation = useMutation(updateCourse, {
    invalidateQueries: '/professor/courses',
    redirectOnSuccess: `/professor/courses/${data._id}`,
    successCallback: () => {
      toaster.success('Course updated successfully');
    },
  });

  const handleSubmit = (values) => {
    return mutation.mutateAsync(values);
  };

  return (
    <HookForm
      initialValues={mergedCourseData}
      onSubmit={handleSubmit}
      validationSchema={courseValidationSchema}
    >
      <Form className="flex flex-col gap-4 pb-24 font-heading">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:items-stretch">
          <div className="lg:col-span-3 flex w-full flex-col gap-4 h-full">
            <CourseInfo className="flex flex-col gap-4 bg-secondary p-4 lg:rounded-lg lg:p-6" />
            <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
              <CourseSettings />
              <CoursePricing />
            </div>
          </div>
          <div className="lg:col-span-2 h-full self-stretch">
            <CourseThumbnailCard />
          </div>
        </div>
        <div className="flex justify-center">
          <Submit>Update</Submit>
        </div>
      </Form>
    </HookForm>
  );
};

export default EditCourseFormSuccess;
