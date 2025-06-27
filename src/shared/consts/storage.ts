export const STORAGE_KEYS = {
  AUTHORIZATION: 'authorization',
  SIDEBAR: 'sidebar',
  POPUP_HIDE_UNTIL: 'popup-hide-until',
} as const;

export const COOKIE_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
  LOGIN_EXPIRED: 'loginExpired',
} as const;

export const SEARCH_PARAMS_KEYS = {
  ORDER_BY: 'orderBy',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  SEARCH: 'search',
  SHOW_TYPE: 'showType',
};
