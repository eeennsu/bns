import { boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const AUDIT_COLUMNS = {
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at').default(null),
};

export const VARCHAR_LENGTH = {
  NAME: 64,
  DESCRIPTION: 256,
  IMAGE: 256,
};

export const SORT_ORDER_COLUMN = integer('sort_order').notNull().default(1);
