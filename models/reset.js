import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string().min(10).required(),
});

export const initialValues = {
  password: '',
};
