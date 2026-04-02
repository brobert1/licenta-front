import axios from 'axios';
import router from 'next/router';
import { refreshToken } from '../api/identity';
import store from '../auth/store';
import { handle, isStream } from './axios-download';

const Axios = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

const withBearer = (req) => {
  req.headers.authorization = `Bearer ${store.getState()}`;
  return req;
};
const success = (res) => {
  return isStream(res?.headers) ? res : res?.data;
};
const error = async (err) => {
  if (err?.response?.status !== 401) {
    throw err?.response?.data || err?.message || err;
  }

  try {
    // Refresh the token
    const token = await refreshToken();
    store.dispatch({ type: 'SET', jwt: token });

    // Retry the original request with the new token
    const originalRequest = err.config;
    originalRequest.headers.authorization = `Bearer ${token}`;

    const response = await axios.request(originalRequest);
    return isStream(response?.headers) ? response : response?.data;
  } catch (refreshErr) {
    // If refresh fails, redirect to login
    return router.push('/login');
  }
};

Axios.download = async (url, data) => {
  return handle(Axios, url, data);
};

Axios.interceptors.request.use(withBearer);
Axios.interceptors.response.use(success, error);

export default Axios;
