import { relations } from 'drizzle-orm';
import { pgTable, varchar, integer, index, unique } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';
import { breads } from './breads';
import { sauces } from './sauces';

export const bundles = pgTable(
  'bundles',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    price: integer('price').notNull(),
    discountedPrice: integer('discounted_price'),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  bundle => ({
    priceIndex: index('bundle_price_idx').on(bundle.price),
  }),
);

export const bundleBreads = pgTable(
  'bundle_breads',
  {
    id: integer('id').primaryKey(),
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
  bundleBreads => ({
    bundleIdIndex: index('bundle_breads_bundle_id_idx').on(bundleBreads.bundleId),
    breadIdIndex: index('bundle_breads_bread_id_idx').on(bundleBreads.breadId),
    uniquePair: unique('bundle_breads_unique_pair_idx').on(
      bundleBreads.bundleId,
      bundleBreads.breadId,
    ),
  }),
);

export const bundleSauces = pgTable(
  'bundle_sauces',
  {
    id: integer('id').primaryKey(),
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
  bundleSauces => ({
    bundleIdIndex: index('bundle_sauces_bundle_id_idx').on(bundleSauces.bundleId),
    sauceIdIndex: index('bundle_sauces_sauce_id_idx').on(bundleSauces.sauceId),
    uniquePair: unique('bundle_sauces_unique_pair_idx').on(
      bundleSauces.bundleId,
      bundleSauces.sauceId,
    ),
  }),
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
