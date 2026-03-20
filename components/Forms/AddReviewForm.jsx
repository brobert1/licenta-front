import { addReview } from '@api/client';
import { StarRating } from '@components';
import { Field, Fieldset, Form, HookForm, Submit } from '@components/HookForm';
import { useMutation } from '@hooks';
import { initialValues, validationSchema } from '@models/client/add-review';
import { slugify } from '@functions';

const LightInput = (props) => (
  <input
    type="text"
    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container px-3 py-2 text-sm font-landing text-on-surface placeholder:text-secondary-muted outline-none focus:ring-2 focus:ring-tertiaryGold/30 focus:border-tertiaryGold/40 transition-colors"
    {...props}
  />
);

const LightTextarea = (props) => (
  <textarea
    rows="3"
    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container px-3 py-2 text-sm font-landing text-on-surface placeholder:text-secondary-muted outline-none focus:ring-2 focus:ring-tertiaryGold/30 focus:border-tertiaryGold/40 transition-colors resize-none"
    {...props}
  />
);

const AddReviewForm = ({ course }) => {
  const mutation = useMutation(addReview, {
    invalidateQueries: `/client/courses/${slugify(course.name, course._id)}`,
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

        <Fieldset name="name">
          <Field as={LightInput} id="name" name="name" placeholder="Enter review title" />
        </Fieldset>

        <Fieldset name="review">
          <Field as={LightTextarea} id="review" name="review" placeholder="Leave a new course review" />
        </Fieldset>

        <Submit
          className="w-full rounded-xl bg-on-surface text-surface font-landing font-semibold text-sm py-2.5 hover:opacity-90 transition-opacity"
          isLoading={mutation.isLoading}
        >
          Submit Review
        </Submit>
      </Form>
    </HookForm>
  );
};

export default AddReviewForm;
