import { DessertFormDto } from '@entities/dessert/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends DessertFormDto {}

const apiCreateDessert = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/dessert', data);
};

export default apiCreateDessert;
