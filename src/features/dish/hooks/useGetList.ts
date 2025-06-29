import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_DISH_KEYS } from '@entities/dish/consts';
import { IDishList } from '@entities/dish/types';

import apiGetDishList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IDishList;
  isLoading: boolean;
  isError: boolean;
}

const useGetDishList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_DISH_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetDishList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetDishList;
