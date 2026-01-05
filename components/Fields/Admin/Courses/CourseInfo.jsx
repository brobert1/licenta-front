import { Fieldset, RichText } from '@components/HookForm';
import CourseDetails from './CourseDetails';

const CourseInfo = (props) => {
  return (
    <div {...props}>
      <h2 className="border-b pb-2 text-lg text-white font-semibold">Course Details</h2>
      <div className="flex flex-col gap-7">
        <CourseDetails />
        <Fieldset label="Course Description" name="description">
          <RichText name="description" placeholder="This course presents..." />
        </Fieldset>
      </div>
    </div>
  );
};

export default CourseInfo;
