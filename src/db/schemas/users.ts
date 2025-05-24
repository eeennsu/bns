import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 18 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  lastLoggedAt: timestamp('last_logged_at', { withTimezone: true }),
  role: varchar('role', { enum: ['user', 'admin'] }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
