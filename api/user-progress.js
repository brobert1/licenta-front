import { axiosAuth } from '@lib';

export const markChapterCompleted = async (data) => {
  return axiosAuth.put(`/user-progress/${data}/mark-completion`);
};

export const unmarkChapterCompleted = async (data) => {
  return axiosAuth.put(`/user-progress/${data}/unmark-completion`);
};

export const markQuizDiagramCompleted = async (data) => {
  return axiosAuth.put(`/user-progress/${data}/mark-quiz-diagram-completion`);
};

export const createDrillProgress = async ({ id, data }) => {
  return axiosAuth.post(`/user-progress/chapters/${id}/drill`, data);
};
