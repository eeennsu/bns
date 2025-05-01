import { pgTable, varchar, integer, index } from 'drizzle-orm/pg-core';

import { auditColumns } from '../consts/commonColumns';

export const breads = pgTable(
  'breads',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: varchar('description', { length: 256 }).notNull(),
    image: varchar('image', { length: 256 }).notNull(),
    price: integer('price').notNull(),
    mbti: varchar('mbti', { length: 4 }).notNull(),
    order: integer('order').notNull(),
    ...auditColumns,
  },
  bread => ({
    nameIndex: index('breads_name_idx').on(bread.name),
    mbtiIndex: index('breads_mbti_idx').on(bread.mbti),
    priceIndex: index('breads_price_idx').on(bread.price),
  }),
);
