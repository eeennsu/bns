import { bundles } from '@db/schemas/bundles';
import { z } from 'zod';

import { FilterDate, ICommandGroup, IImageFile, IList, SelectItem } from '@typings/commons';

import { BundleFormDtoSchema } from './contracts';

type Bundle = typeof bundles.$inferSelect;

export interface IBundle extends FilterDate<Bundle> {}

export interface IBundleItem extends IBundle {
  imageFiles: IImageFile[];
}

export interface IBundleList extends IList<IBundleItem> {}

export type BundleFormDto = z.infer<typeof BundleFormDtoSchema>;

export type SelectProductItem = SelectItem & { price: number };
export type SelectedProductItem = SelectProductItem & { quantity: number };

export type ICommandGroupBundle = ICommandGroup<SelectedProductItem>;
