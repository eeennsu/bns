import { ISessionResponse } from '@entities/auth/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

const apiSession = async () => {
  const response = await axiosAdmin.get<ISessionResponse>('/auth/session');

  return response.data;
};

export default apiSession;
