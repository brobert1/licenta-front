import { addReview } from '@api/client';
import { StarRating } from '@components';
import { Input, Textarea } from '@components/Fields';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { useMutation } from '@hooks';
import { initialValues, validationSchema } from '@models/client/add-review';
import { slugify } from '@functions';

const AddReviewForm = ({ course }) => {
  const mutation = useMutation(addReview, {
    invalidateQueries: `/client/courses/${slugify(course.title, course._id)}`,
  });

  const handleSubmit = async (values) => {
    const data = { ...values, courseId: course._id };
    await mutation.mutateAsync(data);
  };

  return (
    <HookForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-4">
        <Fieldset name="rating">
          <Field as={StarRating} name="rating" />
        </Fieldset>

        <div className="w-1/2">
          <Fieldset name="name">
            <Field as={Input} id="name" name="name" placeholder="Enter review title" />
          </Fieldset>
        </div>

        <Fieldset name="review">
          <Field as={Textarea} id="review" name="review" placeholder="Leave a new course review" />
        </Fieldset>

        <div className="mt-4">
          <Submit className="button full accent" isLoading={mutation.isLoading}>
            Submit Review
          </Submit>
        </div>
      </Form>
    </HookForm>
  );
};

export default AddReviewForm;
