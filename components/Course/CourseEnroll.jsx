import { enrollCourse } from '@api/client';
import { Button } from '@components';
import { slugify } from '@functions';
import { useMutation } from '@hooks';
import { isFunction } from 'lodash';

const CourseEnroll = ({ _id: uuid, name, refetch }) => {
  const mutation = useMutation(enrollCourse, {
    invalidateQueries: `/client/courses/${slugify(name, uuid)}`,
    successCallback: async () => {
      if (isFunction(refetch)) {
        await refetch();
      }
    },
  });

  const handleEnroll = () => mutation.mutateAsync(uuid);

  return (
    <div className="flex flex-col bg-secondary overflow-hidden rounded-lg p-4 gap-4">
      <h4 className="text-white font-semibold">Get Access to Full Course</h4>
      {/* TODO: Dynamic course pricing */}
      <Button onClick={handleEnroll} className="button full w-full accent py-1.5">
        Enroll now - 20$
      </Button>
    </div>
  );
};

export default CourseEnroll;
