import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

interface IParams {
  id: number;
}

const apiDeleteDish = async ({ id }: IParams): Promise<number> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.delete(`/admin/dish/${id}`);

  return id;
};

export default apiDeleteDish;
