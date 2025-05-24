import { users } from '@db/schemas/users';

export type User = typeof users.$inferSelect;
