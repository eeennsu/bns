import axiosAdmin from '@utils/axios/utilAdminInstance';

const apiHealthCheck = async () => {
  const response = await axiosAdmin.get('/admin/healthCheck');

  return response.data;
};

export default apiHealthCheck;
