import { store } from '@auth';
import { axiosAuth, toaster } from '@lib';
import { decode } from 'jsonwebtoken';

export const changePassword = async (data) => {
  return axiosAuth.post('/client/change-password', data);
};

export const uploadImage = ({ file }) => {
  const data = new FormData();
  data.append('image', file);

  return axiosAuth.put(`/client/account/image`, data);
};

export const removeImage = async () => {
  return axiosAuth.delete('/client/account/image');
};

export const updateAccount = async (data) => {
  const { token, message } = await axiosAuth.put('/client/account', data);

  const decoded = decode(token);
  if (!decoded) {
    throw new Error('Failed to decode token. Please try again.');
  }

  store.dispatch({ type: 'SET', jwt: token });
  toaster.success(message);
};

export const enrollCourse = async (courseId) => {
  return axiosAuth.put(`/client/course/${courseId}/enroll`);
};

export const addReview = async (data) => {
  return axiosAuth.post('/client/review', data);
};

export const clientRemoveAccount = async () => {
  return axiosAuth.delete('/client/remove');
};

export const updateNewsletter = async (data) => {
  return axiosAuth.put('/client/account/newsletter', data);
};

export const saveWrongMove = async (data) => {
  return axiosAuth.put('/client/history', data);
};

export const clearMistakes = async (data) => {
  return axiosAuth.delete('/client/history/clear-mistakes', { data });
};

export const createStudy = async (data) => {
  return axiosAuth.post('/studies', data);
};

export const updateStudy = async (data) => {
  return axiosAuth.put(`/studies/${data.id}`, data);
};

export const softDeleteStudy = async (id) => {
  return axiosAuth.put(`/studies/${id}/delete`);
};

export const restoreStudy = async (id) => {
  return axiosAuth.put(`/studies/${id}/restore`);
};

export const deleteStudy = async (id) => {
  return axiosAuth.delete(`/studies/${id}`);
};

export const cloneStudy = async (id) => {
  return axiosAuth.post(`/studies/${id}/clone`);
};

export const updateStudyChapter = async (data) => {
  return axiosAuth.put(`/studies/chapter/${data.id}`, data);
};

export const addStudyChapter = async (data) => {
  return axiosAuth.post('/studies/chapter', data);
};

export const deleteStudyChapter = async (id) => {
  return axiosAuth.delete(`/studies/chapter/${id}`);
};

export const savePgn = async (data) => {
  return axiosAuth.put(`/studies/chapter/${data.id}/pgn`, data);
};

export const reorderStudyChapters = async (data) => {
  return axiosAuth.put('/studies/chapter/reorder', data);
};

export const saveGame = async (data) => {
  return axiosAuth.post('/client/play', data);
};

export const createTag = async (data) => {
  return axiosAuth.post('/tags', data);
};

export const removeTag = async (id) => {
  return axiosAuth.delete(`/tags/${id}`);
};

export const claimCourse = async (courseId) => {
  return axiosAuth.post(`/client/courses/${courseId}/claim`);
};
