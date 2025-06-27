import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_EVENT_KEYS } from '@entities/event/consts';
import { IEventList } from '@entities/event/types';

import apiGetEventList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IEventList;
  isLoading: boolean;
  isError: boolean;
}

const useGetEventList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_EVENT_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetEventList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetEventList;
