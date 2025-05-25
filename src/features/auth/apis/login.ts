import { AdminLoginFormDto } from '@entities/auth/types';
import { IUserRole } from '@entities/user/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IResponse extends IUserRole {
  ok: boolean;
}

const apiLogin = async (data: AdminLoginFormDto): Promise<IResponse> => {
  const response = await axiosAdmin.post('/auth/login', data);

  return response?.data as IResponse;
};

export default apiLogin;
