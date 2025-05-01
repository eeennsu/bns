import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

import { auditColumns } from '../consts/commonColumns';
import { breads } from './breads';
import { bundles } from './bundles';

export const bundleRelations = pgTable('bundle_relations', {
  id: integer('id').primaryKey(),
  description: varchar('description', { length: 256 }).notNull(),
  order: integer('order').notNull(),
  bundleId: integer('bundle_id')
    .references(() => bundles.id)
    .notNull(),
  breadId: integer('bread_id')
    .references(() => breads.id)
    .notNull(),
  quantity: integer('quantity').notNull().default(1).notNull(),
  ...auditColumns,
});
