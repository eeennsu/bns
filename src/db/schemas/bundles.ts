import { relations } from 'drizzle-orm';
import { pgTable, varchar, integer, index, unique, serial } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';
import { breads } from './breads';
import { sauces } from './sauces';

export const bundles = pgTable(
  'bundles',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    price: integer('price').notNull(),
    discountedPrice: integer('discounted_price'),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  t => [index('bundle_price_idx').on(t.price)],
);

export const bundleBreads = pgTable(
  'bundle_breads',
  {
    id: serial('id').primaryKey(),
    bundleId: integer('bundle_id')
      .notNull()
      .references(() => bundles.id, { onDelete: 'restrict' }),
    breadId: integer('bread_id')
      .notNull()
      .references(() => breads.id),
    sortOrder: SORT_ORDER_COLUMN,
    quantity: integer('quantity').notNull(),
    createdAt: AUDIT_COLUMNS.createdAt,
  },
  t => [
    index('bundle_breads_bundle_id_idx').on(t.bundleId),
    index('bundle_breads_bread_id_idx').on(t.breadId),
    unique('bundle_breads_unique_pair_idx').on(t.bundleId, t.breadId),
  ],
);

export const bundleSauces = pgTable(
  'bundle_sauces',
  {
    id: serial('id').primaryKey(),
    bundleId: integer('bundle_id')
      .notNull()
      .references(() => bundles.id, { onDelete: 'restrict' }),
    sauceId: integer('sauce_id')
      .notNull()
      .references(() => sauces.id),
    sortOrder: SORT_ORDER_COLUMN,
    quantity: integer('quantity').notNull(),
    createdAt: AUDIT_COLUMNS.createdAt,
  },
  t => [
    index('bundle_sauces_bundle_id_idx').on(t.bundleId),
    index('bundle_sauces_sauce_id_idx').on(t.sauceId),
    unique('bundle_sauces_unique_pair_idx').on(t.bundleId, t.sauceId),
  ],
);

export const bundlesRelations = relations(bundles, ({ many }) => ({
  breads: many(bundleBreads),
  sauces: many(bundleSauces),
}));

export const bundleBreadsRelations = relations(bundleBreads, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleBreads.bundleId],
    references: [bundles.id],
  }),
  bread: one(breads, {
    fields: [bundleBreads.breadId],
    references: [breads.id],
  }),
}));

export const bundleSaucesRelations = relations(bundleSauces, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleSauces.bundleId],
    references: [bundles.id],
  }),
  sauce: one(sauces, {
    fields: [bundleSauces.sauceId],
    references: [sauces.id],
  }),
}));
