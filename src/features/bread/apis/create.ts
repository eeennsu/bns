import { BreadFormDto } from '@entities/bread/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends BreadFormDto {
  imageIds: number[];
}

const apiCreateBread = async (params: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/bread', params);
};

export default apiCreateBread;
