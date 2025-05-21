import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 18 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  lastLoggedAt: timestamp('last_logged_at', { withTimezone: true }),
});
