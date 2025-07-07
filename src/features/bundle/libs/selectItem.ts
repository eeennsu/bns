import { BundleProduct } from '@entities/bundle/types';

export const convertToSelectItem = (product: BundleProduct) => ({
  value: product.id,
  label: product.name,
  price: product.price,
});
