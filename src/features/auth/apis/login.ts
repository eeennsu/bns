import { AdminLoginFormDto } from '@entities/auth/types';

import axiosMain from '@utils/axios/utilMainInstance';

interface IResponse {
  ok: boolean;
  user: {
    username: string;
  };
}

const apiLogin = async (data: AdminLoginFormDto) => {
  const response = await axiosMain.post<IResponse>('/auth/login', data);

  return response?.data;
};

export default apiLogin;
