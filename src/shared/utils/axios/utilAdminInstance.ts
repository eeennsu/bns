import * as Sentry from '@sentry/nextjs';
import { AxiosResponseError } from '@shared/class/customError';
import { UNKNOWN_ERROR_MESSAGE } from '@shared/consts/commons';
import useMeStore from '@shared/stores/me';
import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { ADMIN_ERRORS } from 'src/shared/api/errorMessage';

import apiRefresh from '@features/auth/apis/refresh';

const axiosAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdmin.interceptors.response.use(
  res => res,
  async (error: AxiosError | Error): Promise<AxiosError> => {
    const isAxios = isAxiosError(error);
    const status = isAxios ? error.response?.status : undefined;
    const message = isAxios ? error.response?.data?.error : undefined;
    const originalRequest = isAxios
      ? (error.config as InternalAxiosRequestConfig & { _retry?: boolean })
      : undefined;

    const shouldRetry =
      isAxios &&
      originalRequest?.url &&
      status === 401 &&
      message === ADMIN_ERRORS.MISSING_ACCESS_TOKEN &&
      !originalRequest._retry;

    if (shouldRetry) {
      originalRequest._retry = true;

      try {
        await apiRefresh();
        return axiosAdmin(originalRequest);
      } catch (refreshError) {
        useMeStore().setMe(null);
        return Promise.reject(refreshError);
      }
    }

    const axiosResponseError = new AxiosResponseError(
      isAxios ? message || UNKNOWN_ERROR_MESSAGE : UNKNOWN_ERROR_MESSAGE,
    );

    Sentry.captureException(axiosResponseError, {
      extra: {
        status,
        url: originalRequest?.url,
      },
    });

    return Promise.reject(error);
  },
);

export default axiosAdmin;
