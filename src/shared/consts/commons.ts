import { ItemShowLabel } from '@shared/typings/commons';

export const PER_PAGE_SIZE = {
  DEFAULT: 10,
  PRODUCT: 8,
} as const;

export const ITEM_SHOW_TYPE: ItemShowLabel[] = ['전체', '공개', '비공개'];
export const FILTER_TYPES = {
  ALL: 'all',
  ON: 'on',
  OFF: 'off',
} as const;

export const FIELD_ARRAY_ID = 'fid' as const;
