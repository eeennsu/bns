import { pgTable, varchar, timestamp, integer, index } from 'drizzle-orm/pg-core';

import { auditColumns } from '../consts/commonColumns';

export const events = pgTable(
  'events',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: varchar('description', { length: 256 }).notNull(),
    image: varchar('image', { length: 256 }).notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    ...auditColumns,
  },
  event => ({
    startDateIndex: index('events_start_date_idx').on(event.startDate),
    endDateIndex: index('events_end_date_idx').on(event.endDate),
  }),
);
