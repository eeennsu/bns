import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IResponse {
  user: {
    username: string;
  };
  isAuthenticated: boolean;
  isAuthorized: boolean;
}

const apiSession = async (): Promise<IResponse> => {
  const response = await axiosAdmin.get('/auth/session');

  return response.data;
};

export default apiSession;
