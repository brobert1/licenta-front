import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  difficulty: Yup.string(),
  gameAspect: Yup.string(),
  popularFilters: Yup.string(),
});

export const initialValues = {
  difficulty: '',
  gameAspect: '',
  popularFilters: '',
};
