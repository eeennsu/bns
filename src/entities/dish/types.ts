
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, IList } from '@typings/commons';

import { DishFormDtoSchema } from './contracts';
import { dishes } from '@db/schemas/dishes';

type Dish = typeof dishes.$inferSelect;
export interface IDish extends FilterDate<Dish> {}
export interface IDishItem extends IDish {
  imageFiles: IImageFile[];
}
export interface IDishList extends IList<IDishItem> {}

export type DishFormDto = z.infer<typeof DishFormDtoSchema>;
