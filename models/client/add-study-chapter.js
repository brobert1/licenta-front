import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  variant: Yup.string().required('Variant is required'),
  orientation: Yup.string().required('Orientation is required'),
  analysis: Yup.string()
    .oneOf(['normal', 'interactive', 'drill'], 'Invalid analysis mode')
    .required('Analysis mode is required'),
  fen: Yup.string().required('FEN content is required'),
  pgn: Yup.string().nullable(),
});

export const initialValues = {
  name: '',
  variant: 'Standard',
  orientation: 'white',
  analysis: 'normal',
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  pgn: '',
};
