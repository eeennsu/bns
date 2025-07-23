import { bundles } from '@db/schemas/bundles';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, ICommandGroup, IList, SelectItem } from '@typings/commons';

import { BUNDLE_COMMAND_GROUP_HEADINGS, BUNDLE_PRODUCT_TYPE } from './consts';
import { BundleFormDtoSchema, BundleProductSchema } from './contracts';

export type BundleProductLabel = (typeof BUNDLE_PRODUCT_TYPE)[keyof typeof BUNDLE_PRODUCT_TYPE];
export type BundleProductValue = (typeof BUNDLE_COMMAND_GROUP_HEADINGS)[number]['value'];
type Bundle = typeof bundles.$inferSelect;

export type IProduct = {
  id: number;
  name: string;
  price: number;
  type: BundleProductValue;
};

export type IBundleProduct = IProduct & {
  quantity: number;
  sortOrder: number;
  breadId?: number | undefined;
  sauceId?: number | undefined;
  dishId?: number | undefined;
  drinkId?: number | undefined;
  dessertId?: number | undefined;
};

export interface IBundle extends FilterDate<Bundle> {}

export interface IBundleItem extends IBundle {
  imageFiles: IImageFile[];
  products: IBundleProduct[];
}

export interface IBundleList extends IList<IBundleItem> {}

export type BundleFormDto = z.infer<typeof BundleFormDtoSchema>;
export type BundleProduct = z.infer<typeof BundleProductSchema>;

export type SelectProductItem = SelectItem & { price: number };
export type SelectedProductItem = SelectProductItem & { quantity: number };

export type ICommandGroupBundle = ICommandGroup<SelectedProductItem>;
