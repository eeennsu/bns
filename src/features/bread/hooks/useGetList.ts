import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_BREAD_KEYS } from '@entities/bread/consts';
import { IBreadList } from '@entities/bread/types';

import apiGetBreadList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IBreadList;
  isLoading: boolean;
  isError: boolean;
}

const useGetBreadList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_BREAD_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetBreadList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetBreadList;
