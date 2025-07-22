import { IServerResponseItem, IServerResponseList } from '@shared/api/typings';
import { dateFormat } from '@shared/libs/date';

import { IBundleItem, IBundleList, IProduct } from '@entities/bundle/types';

export const filterBundleResponse = (response: IServerResponseItem): IBundleItem => {
  return {
    id: response?.data?.id,
    createdAt: dateFormat(response?.data?.createdAt),
    updatedAt: dateFormat(response?.data?.updatedAt),
    deletedAt: response?.data?.deletedAt ? dateFormat(response?.data?.deletedAt) : null,
    name: response?.data?.name,
    description: response?.data?.description,
    price: response?.data?.price,
    discountedPrice: response?.data?.discountedPrice,
    products: response?.data?.products || [],
    sortOrder: response?.data?.sortOrder,
    isHidden: response?.data?.isHidden ?? false,
    imageFiles: response?.data?.imageFiles || [],
  };
};

export const filterBundleListResponse = (response: IServerResponseList): IBundleList => {
  const items = response?.data?.list?.map(item => ({
    id: item?.id,
    createdAt: dateFormat(item?.createdAt),
    updatedAt: dateFormat(item?.updatedAt),
    deletedAt: item?.deletedAt ? dateFormat(item?.deletedAt) : null,
    name: item?.name,
    description: item?.description,
    price: item?.price,
    discountedPrice: item?.discountedPrice || '',
    products: item?.products || [],
    sortOrder: item?.sortOrder,
    isHidden: item?.isHidden ?? false,
    imageFiles: item?.imageFiles || [],
  })) as IBundleItem[];

  return {
    items: items || [],
    total: response?.data?.totalCount || items.length,
    page: response?.data?.page || 1,
  };
};

export const filterProductsResponse = (response: IServerResponseItem): IProduct[] => {
  return response?.data;
};
