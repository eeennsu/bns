import { BundleProduct, BundleProductValue } from '@entities/bundle/types';

export const getSortedBundleProducts = (bundleProducts: BundleProduct[]) => {
  const typeCountMap = new Map<BundleProductValue, number>();

  return bundleProducts.map(product => {
    const productType = product.type as BundleProductValue;
    const currentCount = typeCountMap.get(productType) ?? 0;
    const newCount = currentCount + 1;
    typeCountMap.set(productType, newCount);

    return {
      ...product,
      sortOrder: newCount,
    };
  });
};
