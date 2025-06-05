import { BundleFormDto } from '@entities/bundle/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

interface IParams extends BundleFormDto {}

const apiBundleCreate = async (data: IParams): Promise<void> => {
  await axiosAdmin.post('/admin/bundle', data);
};

export default apiBundleCreate;
