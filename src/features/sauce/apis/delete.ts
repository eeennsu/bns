import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

interface IParams {
  id: number;
}

const apiDeleteSauce = async ({ id }: IParams): Promise<number> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.delete(`/admin/sauce/${id}`);

  return id;
};

export default apiDeleteSauce;
