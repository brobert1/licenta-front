import * as Yup from 'yup';

export const clientValidationSchema = Yup.object().shape({
  name: Yup.string().required('Client name is required'),
  email: Yup.string().required('Client email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .min(8, 'Password must be at least 8 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords does not match'),
  active: Yup.boolean().default(true),
});

export const clientInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  active: true,
};
