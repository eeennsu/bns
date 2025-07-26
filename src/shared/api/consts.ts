export const TOKEN_EXPIRES = {
  ACCESS: '10m',
  REFRESH: '7d',
} as const;

export const COOKIE_EXPIRES = {
  ACCESS: 7 * 24 * 60 * 60, // 7일, (accessToken의 expires가 10분이므로 괜찮음)
  REFRESH: 7 * 24 * 60 * 60, // 7일
} as const;

export const ORDER_BY_TYPES = {
  CREATED_DESC: 'createdAt_desc',
  CREATED_ASC: 'createdAt_asc',
  PRICE_DESC: 'price_desc',
  PRICE_ASC: 'price_asc',
  SORT_ORDER_DESC: 'sortOrder_desc',
  SORT_ORDER_ASC: 'sortOrder_asc',
} as const;
