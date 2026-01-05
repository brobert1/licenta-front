import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  difficulty: Yup.string(),
});

export const initialValues = {
  difficulty: '',
};
