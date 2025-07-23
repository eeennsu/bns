import { BUNDLE_PRODUCT_TYPE } from '@entities/bundle/consts';
import { BundleProductValue } from '@entities/bundle/types';

export const getProductLabel = (value: BundleProductValue) => {
  switch (value) {
    case BUNDLE_PRODUCT_TYPE.BREAD:
      return '빵';
    case BUNDLE_PRODUCT_TYPE.SAUCE:
      return '소스';
    case BUNDLE_PRODUCT_TYPE.DISH:
      return '디쉬';
    case BUNDLE_PRODUCT_TYPE.DRINK:
      return '음료';
    case BUNDLE_PRODUCT_TYPE.DESSERT:
      return '디저트';
    default:
      return '';
  }
};
