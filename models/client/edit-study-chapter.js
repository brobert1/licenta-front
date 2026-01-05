import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string(),
  variant: Yup.string(),
  orientation: Yup.string().required('Orientation is required'),
  analysis: Yup.string().required('Analysis mode is required'),
});

export const initialValues = {
  name: '',
  variant: 'Standard',
  orientation: 'white',
  analysis: 'normal',
};
