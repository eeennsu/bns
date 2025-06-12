import { relations } from 'drizzle-orm';
import { index, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: serial().primaryKey().notNull(),
  url: text().notNull(),
  type: varchar({ length: 50 }).default('image/jpeg').notNull(),
  size: integer().default(0).notNull(),
  name: text().default('').notNull(),
});

export const imageReferences = pgTable(
  'image_references',
  {
    id: serial('id').primaryKey(),
    imageId: integer('image_id').notNull(),
    refTable: varchar('ref_table', { length: 50 }).notNull(),
    refId: integer('ref_id').notNull(),
    order: integer('order').notNull(),
  },
  t => [index('idx_ref_table_id_order').on(t.refTable, t.refId, t.order)],
);

export const imageRelations = relations(images, ({ many }) => ({
  references: many(imageReferences),
}));

export const imageReferenceRelations = relations(imageReferences, ({ one }) => ({
  image: one(images, {
    fields: [imageReferences.imageId],
    references: [images.id],
  }),
}));
