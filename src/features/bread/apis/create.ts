import { BreadFormDto } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends BreadFormDto {}

const apiCreateBread = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/bread', data);
};

export default apiCreateBread;
