import { breads } from '@db/schemas/breads';
import { z } from 'zod';

import { IImageFile, IList } from '@typings/commons';

import { BreadFormDtoSchema } from './contracts';

type Bread = typeof breads.$inferSelect;
export interface IBread extends Bread {}
export interface IBreadItem extends IBread {
  imageFile: IImageFile;
}
export interface IBreadList extends IList<IBreadItem> {}

export type BreadFormDto = z.infer<typeof BreadFormDtoSchema>;
