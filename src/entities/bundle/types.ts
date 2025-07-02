import { bundles } from '@db/schemas/bundles';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, ICommandGroup, IList, SelectItem } from '@typings/commons';

import { BUNDLE_COMMAND_GROUP_HEADINGS } from './consts';
import { BundleFormDtoSchema, BundleProductGroupSchema, BundleProductSchema } from './contracts';

export type BundleProductLabel = (typeof BUNDLE_COMMAND_GROUP_HEADINGS)[number]['label'];
export type BundleProductValue = (typeof BUNDLE_COMMAND_GROUP_HEADINGS)[number]['value'];
type Bundle = typeof bundles.$inferSelect;

export interface IBundle extends FilterDate<Bundle> {}

export interface IBundleItem extends IBundle {
  imageFiles: IImageFile[];
  productsList: BundleProductGroup;
}

export interface IBundleList extends IList<IBundleItem> {}

export type BundleFormDto = z.infer<typeof BundleFormDtoSchema>;
export type BundleProduct = z.infer<typeof BundleProductSchema>;
export type BundleProductGroup = z.infer<typeof BundleProductGroupSchema>;

export type SelectProductItem = SelectItem & { price: number };
export type SelectedProductItem = SelectProductItem & { quantity: number };

export type ICommandGroupBundle = ICommandGroup<SelectedProductItem>;
