import { appendToFormData } from '@functions';
import { axiosAuth } from '@lib';

export const changePassword = (data) => {
  return axiosAuth.post('/admin/change-password', data);
};

export const createCourse = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendToFormData(formData, key, value);
  });

  return (
    axiosAuth.post('/admin/courses', formData),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
};

export const deleteCourse = (id) => {
  return axiosAuth.delete(`/admin/courses/${id}`);
};

export const updateCourse = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendToFormData(formData, key, value);
  });

  return (
    axiosAuth.put(`/admin/courses/${data._id}`, formData),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
};

export const updateChapters = (data) => {
  return axiosAuth.put('/admin/chapters', data);
};

export const updateContent = (data) => {
  return axiosAuth.put('/admin/content', data);
};

export const createClient = (data) => {
  return axiosAuth.post('/admin/clients', data);
};

export const updateClient = (data) => {
  const url = `/admin/clients/${data._id}`;
  return axiosAuth.put(url, data);
};

export const deleteClient = (id) => {
  return axiosAuth.delete(`/admin/clients/${id}`);
};

export const approveReview = (id) => {
  return axiosAuth.put(`/admin/reviews/${id}/approve`);
};

export const deleteReview = (id) => {
  return axiosAuth.delete(`/admin/reviews/${id}`);
};

export const createQuiz = (data) => {
  return axiosAuth.post('/admin/quizzes', data);
};

export const updateDiagramPgn = (data) => {
  return axiosAuth.put(`/admin/diagrams/${data.id}/pgn`, data);
};
