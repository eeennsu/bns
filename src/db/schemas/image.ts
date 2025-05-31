import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: integer('id').primaryKey(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const imageReferences = pgTable('image_references', {
  id: integer('id').primaryKey(),
  imageId: integer('image_id').notNull().unique(),
  refTable: varchar('ref_table', { length: 50 }).notNull(),
  refId: integer('ref_id').notNull(),
  order: integer('order').notNull(),
});

export const imageRelations = relations(images, ({ many }) => ({
  references: many(imageReferences),
}));

export const imageReferenceRelations = relations(imageReferences, ({ one }) => ({
  image: one(images, {
    fields: [imageReferences.imageId],
    references: [images.id],
  }),
}));
