import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  tag: Yup.string(),
});

export const initialValues = {
  tag: '',
};
