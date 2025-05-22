import { AdminLoginFormDto } from '@entities/auth/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IResponse {
  ok: boolean;
}

const apiAuthLogin = async (data: AdminLoginFormDto): Promise<IResponse> => {
  const response = await axiosAdmin.post('/auth/login', data);

  return response?.data as IResponse;
};

export default apiAuthLogin;
