import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface IAccessTokenPayload {
  id: string;
  username: string;
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface IRefreshTokenPayload {
  id: string;
  username?: string;
  type: typeof TOKEN_TYPE.REFRESH;
}
