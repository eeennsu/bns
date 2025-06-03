import { SauceFormDto } from '@entities/sauce/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends SauceFormDto {}

const apiCreateSauce = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/sauce', data);
};

export default apiCreateSauce;
