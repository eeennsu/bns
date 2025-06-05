import { IBundleItem } from '@entities/bundle/types';

import axiosAdmin from '@utils/axios/utilAdminInstance';

import { filterBundleResponse } from '../libs/filterResponse';

interface IParams {
  id: string;
}

const apiGetBundle = async (params: IParams): Promise<IBundleItem> => {
  if (!params?.id) throw new Error('id is required');
  const response = await axiosAdmin.get(`/admin/bundle/${params.id}`);

  const data = filterBundleResponse(response.data);

  return data;
};

export default apiGetBundle;
