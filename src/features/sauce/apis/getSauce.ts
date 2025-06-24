import { ISauceItem } from '@entities/sauce/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterSauceResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetSauce = async ({ id }: IParams): Promise<ISauceItem> => {
  if (!id) throw new Error('id is required');

  const response = await axiosAdmin.get(`/admin/sauce/${id}`);
  const data = filterSauceResponse(response.data);

  return data;
};

export default apiGetSauce;
