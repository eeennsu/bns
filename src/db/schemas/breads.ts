import { relations } from 'drizzle-orm';
import { pgTable, varchar, integer, index, boolean, serial } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';

export const breads = pgTable(
  'breads',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    price: integer('price').notNull(),
    mbti: varchar('mbti', { length: 4 }).notNull(),
    isSignature: boolean('is_signature').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  t => [
    index('breads_name_idx').on(t.name),
    index('breads_mbti_idx').on(t.mbti),
    index('breads_price_idx').on(t.price),
  ],
);

export const breadsRelations = relations(breads, () => ({}));
