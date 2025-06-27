export const TOKEN_EXPIRES_EXP = {
  ACCESS: '10m',
  REFRESH: '7d',
} as const;

export const TOKEN_EXPIRES_MAX_AGE = {
  ACCESS: 10 * 60, // 10분
  REFRESH: 7 * 24 * 60 * 60, // 7일
  // ACCESS: 5,
  // REFRESH: 10,
} as const;

export const ORDER_BY_TYPES = {
  CREATED_DESC: 'createdAt_desc',
  CREATED_ASC: 'createdAt_asc',
  PRICE_DESC: 'price_desc',
  PRICE_ASC: 'price_asc',
  SORT_ORDER_DESC: 'sortOrder_desc',
  SORT_ORDER_ASC: 'sortOrder_asc',
};
