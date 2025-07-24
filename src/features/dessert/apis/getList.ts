import { buildPathWithParams } from '@libs/searchParams';

import { filterDessertListResponse } from '@features/dessert/libs/filterResponse';

import { IDessertList } from '@entities/dessert/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams, ItemShowValue } from '@typings/commons';

interface IParams extends IGetListParams {
  showType: ItemShowValue;
  orderBy: string;
}

const apiGetDessertList = async (params: IParams): Promise<IDessertList> => {
  const path = buildPathWithParams('/admin/dessert', params);

  const response = await axiosAdmin.get(path);
  const data = filterDessertListResponse(response.data);

  return data;
};

export default apiGetDessertList;
