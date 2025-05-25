import { IUserRole } from '@entities/user/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IResponse extends IUserRole {
  ok: boolean;
}

const apiRefresh = async (): Promise<IResponse> => {
  const response = await axiosAdmin.post('/auth/refresh');

  return response?.data as IResponse;
};

export default apiRefresh;
