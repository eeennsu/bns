import dayjs from 'dayjs';

import { IBreadItem, IBreadList } from '@entities/bread/types';

import { IItemResponse, IListResponse } from '@typings/commons';

export const filterBreadResponse = (response: IItemResponse): IBreadItem => {
  return response.data;
};

export const filterBreadListResponse = (response: IListResponse): IBreadList => {
  const items = response.data.list.map(item => ({
    id: item.id,
    createdAt: dayjs.tz(item.createdAt).format('YYYY-MM-DD'),
    updatedAt: dayjs.tz(item.updatedAt).format('YYYY-MM-DD'),
    deletedAt: item.deletedAt ? dayjs.tz(item.deletedAt).format('YYYY-MM-DD') : null,
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
    items,
    total: response.data.totalCount,
    page: response.data.page,
  };
};
