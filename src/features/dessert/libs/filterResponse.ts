import { IServerResponseItem, IServerResponseList } from '@shared/api/typings';
import { dateFormat } from '@shared/libs/date';

import { IDessertItem, IDessertList } from '@entities/dessert/types';

export const filterDessertResponse = (response: IServerResponseItem): IDessertItem => {
  return {
    id: response?.data?.id,
    createdAt: dateFormat(response?.data?.createdAt),
    updatedAt: dateFormat(response?.data?.updatedAt),
    deletedAt: response?.data?.deletedAt ? dateFormat(response?.data?.deletedAt) : null,
    name: response?.data?.name,
    description: response?.data?.description,
    price: Number(response?.data?.price),
    isNew: response?.data?.isNew,
    isSignature: response?.data?.isSignature,
    sortOrder: response?.data?.sortOrder,
    isHidden: response?.data?.isHidden,
    imageFiles: response?.data?.imageFiles || [],
  };
};

export const filterDessertListResponse = (response: IServerResponseList): IDessertList => {
  const items = response?.data?.list?.map(item => ({
    id: item?.id,
    createdAt: dateFormat(item?.createdAt),
    updatedAt: dateFormat(item?.updatedAt),
    deletedAt: item?.deletedAt ? dateFormat(item?.deletedAt) : null,
    name: item?.name,
    description: item?.description,
    price: Number(item?.price),
    isNew: item?.isNew,
    isSignature: item?.isSignature,
    sortOrder: item?.sortOrder,
    isHidden: item?.isHidden,
    imageFiles: item?.imageFiles || [],
  })) as IDessertItem[];

  return {
    items: items || [],
    total: response?.data?.totalCount || items.length,
    page: response?.data?.page || 1,
  };
};
