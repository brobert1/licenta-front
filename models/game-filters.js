import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  search: Yup.string(),
  result: Yup.string(),
});

export const initialValues = {
  search: '',
  result: '',
};
