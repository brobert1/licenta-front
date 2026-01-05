import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  isNewsletter: Yup.boolean(),
});

export const initialValues = {
  name: '',
  email: '',
  password: '',
  isNewsletter: false,
};
