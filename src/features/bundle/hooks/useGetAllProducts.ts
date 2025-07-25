import { useQuery } from '@tanstack/react-query';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { IProduct } from '@entities/bundle/types';

import getProducts from '../apis/getProducts';

interface IReturn {
  allProducts: IProduct[];
  isLoading: boolean;
  isError: boolean;
}

const useGetAllProducts = (): IReturn => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
    queryFn: getProducts,
  });

  return { allProducts: data, isLoading, isError };
};

export default useGetAllProducts;
