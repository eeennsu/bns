import { PER_PAGE_SIZE } from '@shared/consts/commons';
import useListSearchParams from '@shared/hooks/useListSearchParams';
import { filterQueryKeys } from '@shared/libs/buildQuery';
import useItemShowFilterStore, { getItemShowType } from '@shared/stores/itemFilter';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { IBundleList } from '@entities/bundle/types';

import apiGetBundleList from '../apis/getList';

interface IParams {
  orderBy: string;
}

interface IReturn {
  data: IBundleList;
  isLoading: boolean;
  isError: boolean;
}

const useGetBundleList = ({ orderBy }: IParams): IReturn => {
  const { page, search } = useListSearchParams();
  const { showFilter } = useItemShowFilterStore();
  const showType = getItemShowType(showFilter);

  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys(ADMIN_BUNDLE_KEYS.GET_LIST, page, showType, orderBy, search),
    queryFn: () =>
      apiGetBundleList({
        page,
        pageSize: PER_PAGE_SIZE.DEFAULT,
        showType,
        orderBy,
        search,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetBundleList;
