import axiosAdmin from '@utils/axios/utilAdminInstance';

const apiLogout = async () => {
  const response = await axiosAdmin.post('/auth/logout');

  return response.data;
};

export default apiLogout;
