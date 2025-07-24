import { desserts } from '@db/schemas/desserts';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, IList } from '@typings/commons';

import { DessertFormDtoSchema } from './contracts';

type Dessert = typeof desserts.$inferSelect;
export interface IDessert extends FilterDate<Dessert> {}
export interface IDessertItem extends IDessert {
  imageFiles: IImageFile[];
}
export interface IDessertList extends IList<IDessertItem> {}

export type DessertFormDto = z.infer<typeof DessertFormDtoSchema>;
