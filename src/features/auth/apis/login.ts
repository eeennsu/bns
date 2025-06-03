import { AdminLoginFormDto, IUserRole } from '@entities/auth/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IResponse extends IUserRole {
  ok: boolean;
}

const apiLogin = async (data: AdminLoginFormDto) => {
  const response = await axiosAdmin.post<IResponse>('/auth/login', data);

  return response?.data;
};

export default apiLogin;
