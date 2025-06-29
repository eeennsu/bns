import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '@db/consts/commons';
import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const dishes = pgTable(
  'dishes',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    price: integer('price'),
    ingredients: text('ingredients').array().notNull().default([]),
    isSignature: boolean('is_signature').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  t => [index('dish_name_idx').on(t.name), index('dish_price_idx')],
);

export const dishesRelations = relations(dishes, () => ({}));
