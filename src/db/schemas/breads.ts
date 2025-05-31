import { relations } from 'drizzle-orm';
import { pgTable, varchar, integer, index, boolean } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';
import { bundleBreads } from './bundles';

export const breads = pgTable(
  'breads',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    image: varchar('image', { length: STRING_LENGTH.IMAGE }).notNull(),
    price: integer('price').notNull(),
    mbti: varchar('mbti', { length: 4 }).notNull(),
    isSignature: boolean('is_signature').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  bread => ({
    nameIndex: index('breads_name_idx').on(bread.name),
    mbtiIndex: index('breads_mbti_idx').on(bread.mbti),
    priceIndex: index('breads_price_idx').on(bread.price),
  }),
);

export const breadsRelations = relations(breads, ({ many }) => ({
  bundleBreads: many(bundleBreads),
}));
