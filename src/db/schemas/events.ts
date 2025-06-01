import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, integer, index } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';

export const events = pgTable(
  'events',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    image: varchar('image', { length: STRING_LENGTH.IMAGE }),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  event => ({
    startDateIndex: index('events_start_date_idx').on(event.startDate),
    endDateIndex: index('events_end_date_idx').on(event.endDate),
  }),
);

export const eventRelations = relations(events, () => ({}));
