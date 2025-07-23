import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';

export const desserts = pgTable(
  'desserts',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    price: integer('price').notNull(),
    isSignature: boolean('is_signature').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  t => [index('desserts_name_idx').on(t.name), index('desserts_price_idx').on(t.price)],
);

export const dessertsRelations = relations(desserts, () => ({}));
