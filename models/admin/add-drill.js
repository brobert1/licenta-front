import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Drill name is required'),
  pgn: Yup.string().required('PGN is required'),
});

export const initialValues = {
  name: '',
  pgn: '',
};
