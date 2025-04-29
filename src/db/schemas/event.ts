import { pgTable, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

const events = pgTable('events', {
  id: integer('id').primaryKey(),
  isActive: boolean('is_active').default(true).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export default events;
