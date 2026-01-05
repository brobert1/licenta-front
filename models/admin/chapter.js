import { chapterSchema } from 'schemas/chapter';
import * as Yup from 'yup';

export const chaptersValidationSchema = Yup.object().shape({
  chapters: Yup.array().of(chapterSchema),
});

export const chaptersInitialValues = {
  chapters: [],
};
