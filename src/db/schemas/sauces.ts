import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { AUDIT_COLUMNS, SORT_ORDER_COLUMN, STRING_LENGTH } from '../consts/commons';

export const sauces = pgTable(
  'sauces',
  {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: STRING_LENGTH.NAME }).notNull(),
    description: varchar('description', { length: STRING_LENGTH.DESCRIPTION }).notNull(),
    image: varchar('image', { length: STRING_LENGTH.IMAGE }).notNull(),
    price: integer('price').notNull(),
    isSignature: boolean('is_signature').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: SORT_ORDER_COLUMN,
    ...AUDIT_COLUMNS,
  },
  sauce => ({
    nameIndex: unique('sauces_name_idx').on(sauce.name),
    priceIndex: unique('sauces_price_idx').on(sauce.price),
  }),
);

export const saucesRelations = relations(sauces, () => ({}));

// 소스별 빵 추천 목록은 보류. 사장님 의견 듣기
// export const sauceBreadRecommendations = pgTable(
//   'sauce_bread_recommendations',
//   {
//     id: serial('id').primaryKey(),
//     sauceId: integer('sauce_id').references(() => sauces.id),
//     breadId: integer('bread_id').references(() => breads.id),
//     compatibilityScore: integer('compatibility_score').notNull().default(50),
//     createdAt: AUDIT_COLUMNS.createdAt,
//   },
//   table => ({
//     // 같은 소스와 빵의 조합이 중복되지 않도록 유니크 제약조건을 설정
//     uniquePair: unique('sauce_bread_unique').on(table.sauceId, table.breadId),
//   }),
// );

// export const sauceRelations = relations(sauces, ({ many }) => ({
//   recommendations: many(sauceBreadRecommendations),
// }));

// export const sauceBreadRecommendationsRelations = relations(
//   sauceBreadRecommendations,
//   ({ one }) => ({
//     sauce: one(sauces, {
//       fields: [sauceBreadRecommendations.sauceId],
//       references: [sauces.id],
//     }),
//     bread: one(breads, {
//       fields: [sauceBreadRecommendations.breadId],
//       references: [breads.id],
//     }),
//   }),
// );
