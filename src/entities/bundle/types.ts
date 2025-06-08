import { bundles } from '@db/schemas/bundles';
import { z } from 'zod';

import { FilterDate, ICommandGroup, IImageFile, IList, SelectItem } from '@typings/commons';

import { BUNDLE_ITEM_TYPES } from './consts';
import { BundleFormDtoSchema, BundleProductSchema } from './contracts';

export type BundleItemType = (typeof BUNDLE_ITEM_TYPES)[number];
type Bundle = typeof bundles.$inferSelect;

export interface IBundle extends FilterDate<Bundle> {}

export interface IBundleItem extends IBundle {
  imageFiles: IImageFile[];
  productsList: BundleProduct[];
}

export interface IBundleList extends IList<IBundleItem> {}

export type BundleFormDto = z.infer<typeof BundleFormDtoSchema>;
export type BundleProduct = z.infer<typeof BundleProductSchema>;

export type SelectProductItem = SelectItem & { price: number };
export type SelectedProductItem = SelectProductItem & { quantity: number };

export type ICommandGroupBundle = ICommandGroup<SelectedProductItem>;
