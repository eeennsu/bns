import { BundleFormDto } from '@entities/bundle/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams {
  id: number;
  data: BundleFormDto;
}

const apiModifyBundle = async ({ id, data }: IParams): Promise<void> => {
  if (!id) throw new Error('id is required');
  await axiosAdmin.put('/admin/bundle/', data);
};

export default apiModifyBundle;
