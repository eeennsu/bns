import { AdminLoginFormDto, IUserRole } from '@entities/auth/types';

import axiosMain from '@utils/axios/utilMainInstance';

interface IResponse extends IUserRole {
  ok: boolean;
}

const apiLogin = async (data: AdminLoginFormDto) => {
  const response = await axiosMain.post<IResponse>('/auth/login', data);

  return response?.data;
};

export default apiLogin;
