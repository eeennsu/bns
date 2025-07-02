import { useQuery } from '@tanstack/react-query';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { BundleProductGroup } from '@entities/bundle/types';

import apiGetProductsList from '../apis/getProductsList';

interface IReturn {
  productsList: BundleProductGroup;
  isLoading: boolean;
}

const useGetProductList = (): IReturn => {
  const { data, isLoading } = useQuery({
    queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
    queryFn: apiGetProductsList,
  });

  return { productsList: data, isLoading };
};

export default useGetProductList;
