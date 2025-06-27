import { ORDER_BY_TYPES } from '@shared/api/consts';
import { OrderByType } from '@shared/api/typings';

export const getOrderBy = (sortOrder: string) => {
  switch (sortOrder) {
    case '정렬 빠른순':
      return ORDER_BY_TYPES.SORT_ORDER_ASC;
    case '정렬 느린순':
      return ORDER_BY_TYPES.SORT_ORDER_DESC;
    case '최신 등록순':
      return ORDER_BY_TYPES.CREATED_DESC;
    case '오래된 등록순':
      return ORDER_BY_TYPES.CREATED_ASC;
    case '가격 낮은순':
      return ORDER_BY_TYPES.PRICE_ASC;
    case '가격 높은순':
      return ORDER_BY_TYPES.PRICE_DESC;
    default:
      return ORDER_BY_TYPES.CREATED_DESC;
  }
};

export const setOrderBy = (sortOrder: OrderByType) => {
  switch (sortOrder) {
    case ORDER_BY_TYPES.CREATED_DESC:
      return '최신 등록순';
    case ORDER_BY_TYPES.CREATED_ASC:
      return '오래된 등록순';
    case ORDER_BY_TYPES.PRICE_ASC:
      return '가격 낮은순';
    case ORDER_BY_TYPES.SORT_ORDER_ASC:
      return '정렬 빠른순';
    case ORDER_BY_TYPES.SORT_ORDER_DESC:
      return '정렬 느린순';
    case ORDER_BY_TYPES.PRICE_DESC:
      return '가격 높은순';
    default:
      return '최신 등록순';
  }
};
