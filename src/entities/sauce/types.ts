import { sauces } from '@db/schemas/sauces';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { FilterDate, IList } from '@typings/commons';

import { SauceFormDtoSchema } from './contracts';

type Sauce = typeof sauces.$inferSelect;
export interface ISauce extends FilterDate<Sauce> {}
export interface ISauceItem extends ISauce {
  imageFiles: IImageFile[];
}
export interface ISauceList extends IList<ISauceItem> {}

export type SauceFormDto = z.infer<typeof SauceFormDtoSchema>;
