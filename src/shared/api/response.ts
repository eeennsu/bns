import { IServerResponseItem, IServerResponseList } from './typings';

export const defaultResponse = {
  ok: true,
};

export const setSucResponseItem = (data: any): IServerResponseItem => ({
  ok: true,
  data,
});

export const setSucResponseList = ({
  list,
  totalCount,
  page,
}: {
  list: any[];
  totalCount: number;
  page: number;
}): IServerResponseList => ({
  ok: true,
  data: {
    list,
    totalCount,
    page,
  },
});
