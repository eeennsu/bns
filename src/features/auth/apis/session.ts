import { ISessionResponse } from '@entities/auth/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

const apiSession = async (): Promise<ISessionResponse> => {
  const response = await axiosAdmin.get('/auth/session');

  return response.data;
};

export default apiSession;
