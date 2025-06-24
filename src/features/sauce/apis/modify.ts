import { BreadFormDto } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams {
  id: number;
  data: BreadFormDto;
}

const apiModifySauce = async ({ id, data }: IParams): Promise<void> => {
  if (!id) throw new Error('id is required');
  await axiosAdmin.put(`/admin/sauce/${id}`, data);
};

export default apiModifySauce;
