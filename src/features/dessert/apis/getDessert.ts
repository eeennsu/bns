import { IDessertItem } from '@entities/dessert/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterDessertResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetDessert = async ({ id }: IParams): Promise<IDessertItem> => {
  if (!id) throw new Error('id is required');

  const response = await axiosAdmin.get(`/admin/dessert/${id}`);
  const data = filterDessertResponse(response.data);

  return data;
};

export default apiGetDessert;
