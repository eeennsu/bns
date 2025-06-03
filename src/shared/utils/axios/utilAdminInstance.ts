import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { ADMIN_ERRORS } from 'src/shared/api/errorResponse';

import apiRefresh from '@features/auth/apis/refresh';

const axiosAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdmin.interceptors.response.use(
  res => res,
  async (error: AxiosError | Error): Promise<AxiosError> => {
    if (isAxiosError(error)) {
      const originalRequest = error?.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (originalRequest?.url) {
        const status = error?.response?.status;
        const message = error?.response?.data?.error;

        if (
          status === 401 &&
          message === ADMIN_ERRORS.MISSING_ACCESS_TOKEN &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            await apiRefresh();
            return axiosAdmin(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosAdmin;
