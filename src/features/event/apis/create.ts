import { EventFormDto } from '@entities/event/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends EventFormDto {}

const apiEventCreate = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/event', data);
};

export default apiEventCreate;
