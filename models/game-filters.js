import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  opponent: Yup.string(),
  result: Yup.string(),
  period: Yup.string(),
});

export const initialValues = {
  opponent: '',
  result: '',
  period: '',
};
