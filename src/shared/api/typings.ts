import { User } from '@entities/auth/types';

import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface ITokenPayload extends Pick<User, 'id' | 'username' | 'role'> {}

export interface IAccessTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.REFRESH;
}
