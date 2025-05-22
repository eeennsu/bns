import axios from 'axios';

const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdmin.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error?.config;

    if (originalRequest?.url)
      if (error?.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await axiosAdmin.post('/api/auth/refresh');
          return axiosAdmin(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

    return Promise.reject(error);
  },
);

export default axiosAdmin;
