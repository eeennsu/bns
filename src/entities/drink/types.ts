import { drinks } from '@db/schemas/drinks';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, IList } from '@typings/commons';

import { DrinkFormDtoSchema } from './contracts';

type Drink = typeof drinks.$inferSelect;
export interface IDrink extends FilterDate<Drink> {}
export interface IDrinkItem extends IDrink {
  imageFiles: IImageFile[];
}
export interface IDrinkList extends IList<IDrinkItem> {}

export type DrinkFormDto = z.infer<typeof DrinkFormDtoSchema>;
