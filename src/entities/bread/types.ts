import { breads } from '@db/schemas/breads';
import { z } from 'zod';

import { IImageFile, IList, FilterDate } from '@typings/commons';

import { BreadFormDtoSchema } from './contracts';

export interface IBread extends FilterDate<typeof breads.$inferSelect> {}
export interface IBreadItem extends IBread {
  imageFiles: IImageFile[];
}
export interface IBreadList extends IList<IBreadItem> {}

export type BreadFormDto = z.infer<typeof BreadFormDtoSchema>;
