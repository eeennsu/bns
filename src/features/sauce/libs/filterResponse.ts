import { dateFormat } from '@shared/libs/date';

import { ISauceItem, ISauceList } from '@entities/sauce/types';

export const filterSauceResponse = (response: any): ISauceItem => {
  return response;
};

export const filterSauceListResponse = (response: any): ISauceList => {
  const items = response?.data?.list?.map(item => ({
    id: item.id,
    createdAt: dateFormat(item.createdAt),
    updatedAt: dateFormat(item.updatedAt),
    deletedAt: item.deletedAt ? dateFormat(item.deletedAt) : null,
    name: item.name,
    description: item.description,
    mbti: item.mbti,
    price: Number(item.price),
    isNew: item.isNew,
    isSignature: item.isSignature,
    sortOrder: item.sortOrder,
    isHidden: item.isHidden,
  })) as ISauceItem[];

  return {
    items: items || [],
    total: response?.data?.totalCount || items.length,
    page: response?.data?.page || 1,
  };
};
