export const TOKEN_TYPE = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export const TOKEN_EXPIRES_EXP = {
  ACCESS: '10m',
  REFRESH: '7d',
} as const;

export const TOKEN_EXPIRES_MAX_AGE = {
  ACCESS: 10 * 60,
  REFRESH: 7 * 24 * 60 * 60,
} as const;
