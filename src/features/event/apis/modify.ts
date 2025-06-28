import { EventFormDto } from '@entities/event/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams {
  id: number;
  data: EventFormDto;
}

const apiModifyEvent = async ({ id, data }: IParams): Promise<void> => {
  if (!id) throw new Error('id is required');

  await axiosAdmin.put(`/admin/event/${id}`, data);
};

export default apiModifyEvent;
