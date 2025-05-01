import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

import { auditColumns } from '../consts/commonColumns';

export const breads = pgTable('breads', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  price: integer('price').notNull(),
  mbti: varchar('mbti', { length: 4 }).notNull(),
  order: integer('order').notNull(),
  ...auditColumns,
});
