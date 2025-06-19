import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

interface IParams {
  id: number;
}

const apiDeleteBread = async ({ id }: IParams): Promise<number> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.delete(`/admin/bread/${id}`);

  return id;
};

export default apiDeleteBread;
