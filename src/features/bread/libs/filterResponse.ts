import { dateFormat } from '@shared/libs/date';

import { IBreadItem, IBreadList } from '@entities/bread/types';

import { IItemResponse, IListResponse } from '@typings/commons';

export const filterBreadResponse = (response: IItemResponse): IBreadItem => {
  return response.data;
};

export const filterBreadListResponse = (response: IListResponse): IBreadList => {
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
  })) as IBreadItem[];

  return {
    items: items || [],
    total: response?.data?.totalCount || items.length,
    page: response?.data?.page || 1,
  };
};
