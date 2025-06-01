import { boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const AUDIT_COLUMNS = {
  isHidden: boolean('is_active').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at').default(null),
};

export const STRING_LENGTH = {
  NAME: 64,
  DESCRIPTION: 1000,
  IMAGE: 2048,
};

export const SORT_ORDER_COLUMN = integer('sort_order').notNull().default(1);
