import ms from 'ms';

export const TOKEN_TYPE = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export const TOKEN_EXPIRES = {
  ACCESS: ms('15m'),
  REFRESH: ms('7d'),
} as const;
