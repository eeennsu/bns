import { IUserRole } from '@entities/user/types';

import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface ITokenPayload extends IUserRole {
  id: string;
  username: string;
}

export interface IAccessTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  type: typeof TOKEN_TYPE.REFRESH;
}
