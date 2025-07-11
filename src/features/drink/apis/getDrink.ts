import { IDrinkItem } from '@entities/drink/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterDrinkResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetDrink = async ({ id }: IParams): Promise<IDrinkItem> => {
  if (!id) throw new Error('id is required');

  const response = await axiosAdmin.get(`/admin/drink/${id}`);
  const data = filterDrinkResponse(response.data);

  return data;
};

export default apiGetDrink;
