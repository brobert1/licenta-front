import { appendToFormData } from '@functions';
import { axiosAuth } from '@lib';

export const createCourse = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendToFormData(formData, key, value);
  });

  return axiosAuth.post('/professor/courses', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteCourse = (id) => {
  return axiosAuth.delete(`/professor/courses/${id}`);
};

export const updateCourse = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendToFormData(formData, key, value);
  });

  return axiosAuth.put(`/professor/courses/${data._id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateChapters = (data) => {
  return axiosAuth.put('/professor/chapters', data);
};

export const updateContent = (data) => {
  return axiosAuth.put('/professor/content', data);
};

export const approveReview = (id) => {
  return axiosAuth.put(`/professor/reviews/${id}/approve`);
};

export const deleteReview = (id) => {
  return axiosAuth.delete(`/professor/reviews/${id}`);
};
