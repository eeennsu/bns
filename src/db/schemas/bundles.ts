import { relations } from 'drizzle-orm';
import { pgTable, varchar, integer, index, unique, serial } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';
import { breads } from './breads';
import { desserts } from './desserts';
import { dishes } from './dishes';
import { drinks } from './drinks';
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

export const bundleDishes = pgTable(
  'bundle_dishes',
  {
    id: serial('id').primaryKey(),
    bundleId: integer('bundle_id')
      .notNull()
      .references(() => bundles.id, { onDelete: 'restrict' }),
    dishId: integer('dish_id')
      .notNull()
      .references(() => dishes.id),
    sortOrder: SORT_ORDER_COLUMN,
    quantity: integer('quantity').notNull(),
    createdAt: AUDIT_COLUMNS.createdAt,
  },
  t => [
    index('bundle_dishes_bundle_id_idx').on(t.bundleId),
    index('bundle_dishes_dish_id_idx').on(t.dishId),
    unique('bundle_dishes_unique_pair_idx').on(t.bundleId, t.dishId),
  ],
);

export const bundleDrinks = pgTable(
  'bundle_drinks',
  {
    id: serial('id').primaryKey(),
    bundleId: integer('bundle_id')
      .notNull()
      .references(() => bundles.id, { onDelete: 'restrict' }),
    drinkId: integer('drink_id')
      .notNull()
      .references(() => drinks.id),
    sortOrder: SORT_ORDER_COLUMN,
    quantity: integer('quantity').notNull(),
    createdAt: AUDIT_COLUMNS.createdAt,
  },
  t => [
    index('bundle_drinks_bundle_id_idx').on(t.bundleId),
    index('bundle_drinks_drink_id_idx').on(t.drinkId),
    unique('bundle_drinks_unique_pair_idx').on(t.bundleId, t.drinkId),
  ],
);

export const bundleDesserts = pgTable(
  'bundle_desserts',
  {
    id: serial('id').primaryKey(),
    bundleId: integer('bundle_id')
      .notNull()
      .references(() => bundles.id, { onDelete: 'restrict' }),
    dessertId: integer('dessert_id')
      .notNull()
      .references(() => desserts.id),
    sortOrder: SORT_ORDER_COLUMN,
    quantity: integer('quantity').notNull(),
    createdAt: AUDIT_COLUMNS.createdAt,
  },
  t => [
    index('bundle_desserts_bundle_id_idx').on(t.bundleId),
    index('bundle_desserts_dessert_id_idx').on(t.dessertId),
    unique('bundle_desserts_unique_pair_idx').on(t.bundleId, t.dessertId),
  ],
);

export const bundlesRelations = relations(bundles, ({ many }) => ({
  breads: many(bundleBreads),
  sauces: many(bundleSauces),
  dishes: many(bundleDishes),
  drinks: many(bundleDrinks),
  desserts: many(bundleDesserts),
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

export const bundleDishesRelations = relations(bundleDishes, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleDishes.bundleId],
    references: [bundles.id],
  }),
  dish: one(dishes, {
    fields: [bundleDishes.dishId],
    references: [dishes.id],
  }),
}));

export const bundleDrinksRelations = relations(bundleDrinks, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleDrinks.bundleId],
    references: [bundles.id],
  }),
  drink: one(drinks, {
    fields: [bundleDrinks.drinkId],
    references: [drinks.id],
  }),
}));

export const bundleDessertsRelations = relations(bundleDesserts, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleDesserts.bundleId],
    references: [bundles.id],
  }),
  dessert: one(desserts, {
    fields: [bundleDesserts.dessertId],
    references: [desserts.id],
  }),
}));
