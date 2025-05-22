import ms from 'ms';

export const TOKEN_TYPE = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

// config/token.ts
export const TOKEN_EXPIRES = {
  ACCESS: '15m',
  REFRESH: '7d',
} as const;

export const TOKEN_EXPIRES_MS = {
  ACCESS: ms(TOKEN_EXPIRES.ACCESS),
  REFRESH: ms(TOKEN_EXPIRES.REFRESH),
};
