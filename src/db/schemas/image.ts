import { SORT_ORDER_COLUMN } from '@db/consts/commons';
import { relations } from 'drizzle-orm';
import { index, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: serial().primaryKey().notNull(),
  url: text().notNull(),
  name: text().default('').notNull(),
});

export const imageReferences = pgTable(
  'image_references',
  {
    id: serial('id').primaryKey(),
    imageId: integer('image_id').notNull(),
    refTable: varchar('ref_table', { length: 50 }).notNull(),
    refId: integer('ref_id'), // 이미지 저장 후 참조될 데이터 생성 후 할당될 것임
    sortOrder: SORT_ORDER_COLUMN,
  },
  t => [index('idx_ref_table_id_order').on(t.refTable, t.refId, t.sortOrder)],
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
