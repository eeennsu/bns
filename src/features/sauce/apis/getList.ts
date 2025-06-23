import { buildPathWithParams } from '@libs/searchParams';

import { filterSauceListResponse } from '@features/sauce/libs/filterResponse';

import { ISauceList } from '@entities/sauce/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams } from '@typings/commons';

interface IParams extends IGetListParams {}

const apiGetSauceList = async ({ page, pageSize, search }: IParams): Promise<ISauceList> => {
  const url = buildPathWithParams('/admin/sauce', { page, pageSize, search });

  const response = await axiosAdmin.get(url);
  const data = filterSauceListResponse(response.data);

  return data;
};

export default apiGetSauceList;
