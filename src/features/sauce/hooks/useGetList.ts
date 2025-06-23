import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_SAUCE_KEYS } from '@entities/sauce/consts';
import { ISauceList } from '@entities/sauce/types';

import apiGetSauceList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: ISauceList;
  isLoading: boolean;
  isError: boolean;
}

const useGetSauceList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys([ADMIN_SAUCE_KEYS.GET_LIST, page, showType, orderBy, search]),
    queryFn: () =>
      apiGetSauceList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetSauceList;
