import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

import { BundleProductGroup } from '@entities/bundle/types';

import { filterProductsResponse } from '../libs/filterResponse';

const apiGetProductsList = async (): Promise<BundleProductGroup> => {
  const response = await axiosAdmin.get('/admin/bundle/product');

  const data = filterProductsResponse(response.data);
  return data;
};

export default apiGetProductsList;
