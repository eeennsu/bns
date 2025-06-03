import { buildUrlWithParams } from '@libs/searchParams';

import { IBreadList } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterBreadListResponse } from '../libs/filterResponse';
import { IGetListParams } from '@typings/commons';

interface IParams extends IGetListParams {}

const apiGetBreadList = async ({ page, pageSize, search }: IParams): Promise<IBreadList> => {
  const url = buildUrlWithParams('/admin/bread/list', { page, pageSize, search });

  const response = await axiosAdmin.get(url);
  const data = filterBreadListResponse(response.data);

  return data;
};

export default apiGetBreadList;
