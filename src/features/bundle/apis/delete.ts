import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

interface IParams {
  id: number;
}

const apiDeleteBundle = async ({ id }: IParams): Promise<number> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.delete(`/admin/bundle/${id}`);

  return id;
};

export default apiDeleteBundle;
