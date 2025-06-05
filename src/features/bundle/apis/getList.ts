import { buildUrlWithParams } from '@libs/searchParams';

import { IBundleList } from '@entities/bundle/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams } from '@typings/commons';

import { filterBundleListResponse } from '../libs/filterResponse';

interface IParams extends IGetListParams {}

const apiGetBundleList = async ({ page, pageSize, search }: IParams): Promise<IBundleList> => {
  const url = buildUrlWithParams('/admin/bundle/list', { page, pageSize, search });

  const response = await axiosAdmin.get(url);
  const data = filterBundleListResponse(response.data);

  return data;
};

export default apiGetBundleList;
