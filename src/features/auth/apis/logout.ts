import axiosMain from '@utils/axios/utilMainInstance';

const apiLogout = async () => {
  const response = await axiosMain.post('/auth/logout');

  return response.data;
};

export default apiLogout;
