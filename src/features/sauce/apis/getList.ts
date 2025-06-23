import { buildPathWithParams } from '@libs/searchParams';

import { filterSauceListResponse } from '@features/sauce/libs/filterResponse';

import { ISauceList } from '@entities/sauce/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams, ItemShowValue } from '@typings/commons';

interface IParams extends IGetListParams {
  showType: ItemShowValue;
  orderBy: string;
}

const apiGetSauceList = async (params: IParams): Promise<ISauceList> => {
  const path = buildPathWithParams('/admin/sauce', params);

  const response = await axiosAdmin.get(path);
  const data = filterSauceListResponse(response.data);

  return data;
};

export default apiGetSauceList;
