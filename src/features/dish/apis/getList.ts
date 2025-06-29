import { buildPathWithParams } from '@libs/searchParams';

import { filterDishListResponse } from '@features/dish/libs/filterResponse';

import { IDishList } from '@entities/dish/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams, ItemShowValue } from '@typings/commons';

interface IParams extends IGetListParams {
  showType: ItemShowValue;
  orderBy: string;
}

const apiGetDishList = async (params: IParams): Promise<IDishList> => {
  const path = buildPathWithParams('/admin/dish', params);

  const response = await axiosAdmin.get(path);
  const data = filterDishListResponse(response.data);

  return data;
};

export default apiGetDishList;
