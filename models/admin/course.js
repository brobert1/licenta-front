import * as Yup from 'yup';

export const courseValidationSchema = Yup.object().shape({
  name: Yup.string().required('Course name is required'),
  difficulty: Yup.string().required('Course difficulty is required'),
  description: Yup.string().required('Course description is required'),
  image: Yup.mixed(),
  isPaid: Yup.boolean().default(false),
  price: Yup.mixed().when('isPaid', {
    is: true,
    then: () =>
      Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required for paid courses'),
    otherwise: () =>
      Yup.mixed()
        .notRequired()
        .transform(() => undefined),
  }),
  currency: Yup.string().when('isPaid', {
    is: true,
    then: (schema) => schema.required('Currency is required for paid courses'),
    otherwise: (schema) => schema.optional(),
  }),
  sale: Yup.object().shape({
    isActive: Yup.boolean(),
    price: Yup.mixed().when('isActive', {
      is: true,
      then: () =>
        Yup.number()
          .typeError('Sale price must be a number')
          .positive('Sale price must be greater than 0')
          .required('Sale price is required when on sale')
          .test(
            'less-than-regular',
            'Sale price must be less than regular price',
            function (value) {
              // parent is sale, parent's parent is the course object
              const regularPrice = this.parent?.parent?.price;
              // If either value or regularPrice is not set, skip validation
              return !value || !regularPrice || Number(value) < Number(regularPrice);
            }
          ),
      otherwise: () =>
        Yup.mixed()
          .notRequired()
          .transform(() => undefined),
    }),
    endsAt: Yup.string().when('isActive', {
      is: true,
      then: (schema) =>
        schema
          .required('Sale end date is required')
          .test('is-future', 'Sale end date must be in the future', (value) => {
            if (!value) return false;
            return new Date(value) > new Date();
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  active: Yup.boolean().default(true),
  hasMoveTrainer: Yup.boolean().default(false),
});

export const courseInitialValues = {
  name: '',
  difficulty: '',
  description: '',
  image: '',
  isPaid: false,
  price: '',
  currency: '',
  sale: {
    isActive: false,
    price: '',
    endsAt: '',
  },
  active: true,
  hasMoveTrainer: false,
};
