import { buildPathWithParams } from '@libs/searchParams';

import { IEventList } from '@entities/event/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { IGetListParams } from '@typings/commons';

import { filterEventListResponse } from '../libs/filterResponse';

interface IParams extends IGetListParams {}

const apiGetEventList = async (params: IParams): Promise<IEventList> => {
  const url = buildPathWithParams('/admin/event', params);

  const response = await axiosAdmin.get(url);
  const data = filterEventListResponse(response.data);

  return data;
};

export default apiGetEventList;
