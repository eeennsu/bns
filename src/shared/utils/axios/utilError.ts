import { isAxiosError } from 'axios';

export const axiosErrorHandler = (error: Error) => {
  const defaultErrorMessage = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  if (isAxiosError(error)) {
    return error?.response?.data?.error || defaultErrorMessage;
  }

  return error?.message || defaultErrorMessage;
};
