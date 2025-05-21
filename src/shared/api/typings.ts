import { TOKEN_TYPE } from './consts';

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface AccessTokenPayload {
  id: string;
  username: string;
  type: typeof TOKEN_TYPE.ACCESS;
}

export interface RefreshTokenPayload {
  id: string;
  username?: string;
  type: typeof TOKEN_TYPE.REFRESH;
}
