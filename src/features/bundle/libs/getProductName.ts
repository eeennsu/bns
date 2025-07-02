import { toPlural } from '@shared/libs/format';

import { BUNDLE_COMMAND_GROUP_HEADINGS } from '@entities/bundle/consts';
import { BundleProductLabel, BundleProductValue } from '@entities/bundle/types';

export const getProductName = (label: BundleProductLabel) => {
  const value = BUNDLE_COMMAND_GROUP_HEADINGS.find(item => item.label === label)
    ?.value as BundleProductValue;
  return toPlural(value);
};
