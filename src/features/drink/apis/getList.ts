import { buildPathWithParams } from '@libs/searchParams';

import { filterDrinkListResponse } from '@features/drink/libs/filterResponse';

import { IDrinkList } from '@entities/drink/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams, ItemShowValue } from '@typings/commons';

interface IParams extends IGetListParams {
  showType: ItemShowValue;
  orderBy: string;
}

const apiGetDrinkList = async (params: IParams): Promise<IDrinkList> => {
  const path = buildPathWithParams('/admin/drink', params);

  const response = await axiosAdmin.get(path);
  const data = filterDrinkListResponse(response.data);

  return data;
};

export default apiGetDrinkList;
