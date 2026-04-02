import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email address is not valid').required('Email address is required'),
  message: Yup.string().required('Message is required'),
});

export const initialValues = {
  name: '',
  email: '',
  message: '',
};
