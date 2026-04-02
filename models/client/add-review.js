import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Title is required'),
  review: Yup.string().required('Review is required'),
  rating: Yup.number().required('Rating is required'),
});

export const initialValues = {
  name: '',
  review: '',
  rating: 5,
};
