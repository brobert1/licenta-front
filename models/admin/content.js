import * as Yup from 'yup';

export const contentInitialValues = {
  content: [],
};

export const contentValidationSchema = Yup.object().shape({
  content: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().required('ID is required'),
        name: Yup.string().required('Name is required'),
        kind: Yup.mixed().oneOf(['study', 'quiz']).required('Type is required'),
        index: Yup.number().required('Index is required'),
      })
    )
    .required('Content is required'),
});
