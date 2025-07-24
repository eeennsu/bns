import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_DESSERT_KEYS } from '@entities/dessert/consts';
import { IDessertList } from '@entities/dessert/types';

import apiGetDessertList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IDessertList;
  isLoading: boolean;
  isError: boolean;
}

const useGetDessertList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_DESSERT_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetDessertList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetDessertList;
