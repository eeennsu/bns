import axiosAdmin from '@shared/utils/axios/utilAdminInstance';

import { IProduct } from '@entities/bundle/types';

import { filterProductsResponse } from '../libs/filterResponse';

const getProducts = async (): Promise<IProduct[]> => {
  const response = await axiosAdmin.get('/admin/bundle/product');

  const data = filterProductsResponse(response.data);
  return data;
};

export default getProducts;
