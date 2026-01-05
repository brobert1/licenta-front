import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Quiz name is required'),
  course: Yup.string().required('Course is required'),
  pgn: Yup.string().required('PGN file is required'),
  active: Yup.boolean(),
});

export const initialValues = {
  name: '',
  course: '',
  pgn: '',
  active: true,
};
