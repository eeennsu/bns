import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, index, serial } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';

export const events = pgTable(
  'events',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    shortDescription: varchar('description', { length: STRING_LENGTH.DESCRIPTION })
      .notNull()
      .default(''),
    longDescription: varchar('long_description', {
      length: STRING_LENGTH.LONG_DESCRIPTION,
    })
      .notNull()
      .default(''),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  t => [
    index('events_name_idx').on(t.name),
    index('events_start_date_idx').on(t.startDate),
    index('events_end_date_idx').on(t.endDate),
  ],
);

export const eventRelations = relations(events, () => ({}));
