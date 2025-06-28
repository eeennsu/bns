import { IEventItem } from '@entities/event/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterEventResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetEvent = async ({ id }: IParams): Promise<IEventItem> => {
  if (!id) throw new Error('id is required');
  const response = await axiosAdmin.get(`/admin/event/${id}`);

  const data = filterEventResponse(response.data);

  return data;
};

export default apiGetEvent;
