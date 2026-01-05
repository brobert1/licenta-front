import { CourseFiltersForm } from '@components/Forms';
import { Form, HookForm } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/course-filters';

const CoursesListFilters = ({ setOptions }) => {
  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={setOptions}
      autoSubmit={true}
    >
      <Form>
        <CourseFiltersForm />
      </Form>
    </HookForm>
  );
};

export default CoursesListFilters;
