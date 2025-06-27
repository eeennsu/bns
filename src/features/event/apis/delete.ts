import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

interface IParams {
  id: number;
}

const apiDeleteEvent = async ({ id }: IParams): Promise<number> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.delete(`/admin/event/${id}`);

  return id;
};

export default apiDeleteEvent;
