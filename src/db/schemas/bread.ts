import { pgTable, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

const breads = pgTable('bread', {
  id: integer('id').primaryKey(),
  isActive: boolean('is_active').default(true).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  price: integer('price').notNull(),
  mbti: varchar('mbti', { length: 4 }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'), 
});

export default breads;
