import { users } from '@db/schemas/users';
import { TokenType } from 'src/shared/api/typings';
import { z } from 'zod';

import { adminLoginFormDtoSchema } from './contracts';

export type AdminLoginFormDto = z.infer<typeof adminLoginFormDtoSchema>;

export type User = typeof users.$inferSelect;
export type UserRole = User['role'];

export interface IMe extends Pick<User, 'username'> {
  isAuthenticated: boolean;
}

export interface IVerifyToken {
  id: string;
  username: string;
  role: UserRole;
  type: TokenType;
  iat: number;
  exp: number;
}

export interface ISessionResponse {
  user?: Pick<IMe, 'username' | 'isAuthenticated'>;
}
