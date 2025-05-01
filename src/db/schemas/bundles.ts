import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

import { auditColumns } from '../consts/commonColumns';

export const bundles = pgTable('bundles', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }),
  price: integer('price').notNull(),
  order: integer('order').notNull(),
  ...auditColumns,
});
