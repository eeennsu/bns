import { buildPathWithParams } from '@libs/searchParams';

import { IEventList } from '@entities/event/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams } from '@typings/commons';

import { filterEventListResponse } from '../libs/filterResponse';

interface IParams extends IGetListParams {}

const apiGetEventList = async ({ page, pageSize, search }: IParams): Promise<IEventList> => {
  const url = buildPathWithParams('/admin/event', { page, pageSize, search });

  const response = await axiosAdmin.get(url);
  const data = filterEventListResponse(response.data);

  return data;
};

export default apiGetEventList;
