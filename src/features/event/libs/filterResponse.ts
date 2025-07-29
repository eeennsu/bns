import { IServerResponseItem, IServerResponseList } from '@shared/api/typings';
import { dateFormat } from '@shared/libs/date';

import { IEventItem, IEventList } from '@entities/event/types';

export const filterEventResponse = (response: IServerResponseItem): IEventItem => {
  return {
    id: response?.data?.id,
    createdAt: dateFormat(response?.data?.createdAt),
    updatedAt: dateFormat(response?.data?.updatedAt),
    deletedAt: response?.data?.deletedAt ? dateFormat(response?.data?.deletedAt) : null,
    name: response?.data?.name,
    shortDescription: response?.data?.shortDescription,
    longDescription: response?.data?.longDescription,
    startDate: new Date(response?.data?.startDate),
    endDate: new Date(response?.data?.endDate),
    sortOrder: response?.data?.sortOrder,
    isHidden: response?.data?.isHidden,
    imageFiles: response?.data?.imageFiles || [],
  };
};

export const filterEventListResponse = (response: IServerResponseList): IEventList => {
  const items = response?.data?.list?.map(item => ({
    id: item?.id,
    createdAt: dateFormat(item?.createdAt),
    updatedAt: dateFormat(item?.updatedAt),
    deletedAt: item?.deletedAt ? dateFormat(item?.deletedAt) : null,
    name: item?.name,
    shortDescription: item?.shortDescription,
    longDescription: item?.longDescription,
    startDate: dateFormat(item?.startDate, { hasDyOfWeek: true }),
    endDate: dateFormat(item?.endDate, { hasDyOfWeek: true }),
    sortOrder: item?.sortOrder,
    isHidden: item?.isHidden,
  })) as IEventItem[];

  return {
    items: items || [],
    total: response?.data?.totalCount || items.length,
    page: response?.data?.page || 1,
  };
};
