import * as Yup from 'yup';

export const chapterInitialValues = {
  index: '',
  name: '',
  video: '',
  pgn: '',
};

export const chapterSchema = Yup.object().shape({
  index: Yup.number(),
  name: Yup.string().required('Name is required'),
  video: Yup.string(),
  pgn: Yup.string().required('PGN is required'),
});
