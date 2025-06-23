import { buildPathWithParams } from '@libs/searchParams';

import { IBreadList } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams, ItemShowValue } from '@typings/commons';

import { filterBreadListResponse } from '../libs/filterResponse';

interface IParams extends IGetListParams {
  showType: ItemShowValue;
  orderBy: string;
}

const apiGetBreadList = async (params: IParams): Promise<IBreadList> => {
  const path = buildPathWithParams('/admin/bread', params);

  const response = await axiosAdmin.get(path);
  const data = filterBreadListResponse(response.data);

  return data;
};

export default apiGetBreadList;
