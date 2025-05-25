import { users } from '@db/schemas/users';

export type User = typeof users.$inferSelect;
export type UserRole = User['role'];

export interface IUserRole {
  role: UserRole;
}

export interface IMe extends IUserRole {
  isLogin: boolean;
}
