import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { ADMIN_BUNDLE_KEYS, BUNDLE_PRODUCT_TYPE } from '@entities/bundle/consts';
import { IBundleItem, IBundleProduct, IProduct } from '@entities/bundle/types';

import apiGetBundle from '../apis/getBundle';

interface IReturn {
  bundle: IBundleItem;
  bundleProducts: IBundleProduct[];
  isLoading: boolean;
  isError: boolean;
}

const useGetBundle = (allProducts: IProduct[]): IReturn => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BUNDLE_KEYS.GET, id],
    queryFn: () => apiGetBundle({ id }),
  });

  const bundleProducts = useMemo(
    () =>
      (data?.products ?? []).map(product => {
        if (!allProducts)
          return {
            id: product.breadId || product.sauceId || product.dishId || product.drinkId || 0,
            type: product.type,
            quantity: product.quantity,
            name: '',
            price: 0,
            sortOrder: 0,
          };

        let matched: IProduct | undefined;

        switch (product.type) {
          case BUNDLE_PRODUCT_TYPE.BREAD:
            matched = allProducts.find(
              p => p.id === product.breadId && p.type === BUNDLE_PRODUCT_TYPE.BREAD,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.SAUCE:
            matched = allProducts.find(
              p => p.id === product.sauceId && p.type === BUNDLE_PRODUCT_TYPE.SAUCE,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.DISH:
            matched = allProducts.find(
              p => p.id === product.dishId && p.type === BUNDLE_PRODUCT_TYPE.DISH,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.DRINK:
            matched = allProducts.find(
              p => p.id === product.drinkId && p.type === BUNDLE_PRODUCT_TYPE.DRINK,
            );
            break;
        }

        return {
          id:
            matched?.id ||
            product.breadId ||
            product.sauceId ||
            product.dishId ||
            product.drinkId ||
            0,
          type: product.type,
          quantity: product.quantity,
          sortOrder: product.sortOrder,
          name: matched?.name ?? '',
          price: matched?.price ?? 0,
        };
      }),
    [allProducts, data?.products],
  );

  return { bundle: data, bundleProducts, isLoading, isError };
};

export default useGetBundle;
