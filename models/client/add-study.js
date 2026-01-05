import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  icon: Yup.string().required('Icon is required'),
  course: Yup.string().nullable(),
});

export const validationSchemaAdmin = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  icon: Yup.string().required('Icon is required'),
  course: Yup.string().required('Course is required'),
});

export const initialValues = {
  name: '',
  icon: '',
  course: null,
};
