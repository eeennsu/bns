import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_DRINK_KEYS } from '@entities/drink/consts';
import { IDrinkList } from '@entities/drink/types';

import apiGetDrinkList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IDrinkList;
  isLoading: boolean;
  isError: boolean;
}

const useGetDrinkList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_DRINK_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetDrinkList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetDrinkList;
