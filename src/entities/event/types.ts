import { events } from '@db/schemas/events';
import { z } from 'zod';

import { IImageFile } from '@entities/image/types';

import { IList, FilterDate } from '@typings/commons';

import { EventFormDtoSchema } from './contracts';

type Event = typeof events.$inferSelect;
export interface IEvent extends FilterDate<Omit<Event, 'startDate' | 'endDate'>> {
  startDate: string | Date;
  endDate: string | Date;
}
export interface IEventItem extends IEvent {
  imageFiles: IImageFile[];
}
export interface IEventList extends IList<IEventItem> {}

export type EventFormDto = z.infer<typeof EventFormDtoSchema>;
