import { IDishItem } from '@entities/dish/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterDishResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetDish = async ({ id }: IParams): Promise<IDishItem> => {
  if (!id) throw new Error('id is required');

  const response = await axiosAdmin.get(`/admin/dish/${id}`);
  const data = filterDishResponse(response.data);

  return data;
};

export default apiGetDish;
