import { User } from '@entities/user/types';

import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface ITokenPayload {
  id: string;
  username: string;
  role: User['role'];
}

export interface IAccessTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.REFRESH;
}
