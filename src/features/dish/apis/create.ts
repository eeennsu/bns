import { DishFormDto } from '@entities/dish/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends DishFormDto {}

const apiCreateDish = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/dish', data);
};

export default apiCreateDish;
