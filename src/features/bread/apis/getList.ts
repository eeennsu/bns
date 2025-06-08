import { buildUrlWithParams } from '@libs/searchParams';

import { IBreadList } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams } from '@typings/commons';

import { filterBreadListResponse } from '../libs/filterResponse';

interface IParams extends IGetListParams {}

const apiGetBreadList = async ({ page, pageSize, search }: IParams): Promise<IBreadList> => {
  const url = buildUrlWithParams('/admin/bread', { page, pageSize, search });

  const response = await axiosAdmin.get(url);
  const data = filterBreadListResponse(response.data);

  return data;
};

export default apiGetBreadList;
