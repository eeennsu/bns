import { IBreadItem } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterBreadResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetBread = async ({ id }: IParams): Promise<IBreadItem> => {
  if (!id) throw new Error('id is required');

  const response = await axiosAdmin.get(`/admin/bread/${id}`);
  const data = filterBreadResponse(response.data);

  return data;
};

export default apiGetBread;
