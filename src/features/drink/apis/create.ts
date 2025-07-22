import { DrinkFormDto } from '@entities/drink/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends DrinkFormDto {}

const apiCreateDrink = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/drink', data);
};

export default apiCreateDrink;
