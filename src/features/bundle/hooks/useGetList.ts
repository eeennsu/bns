import { filterQueryKeys } from '@shared/libs/buildQuery';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';

import apiGetBundleList from '../apis/getList';

const useGetBundleList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys([ADMIN_BUNDLE_KEYS.GET_LIST]),
    queryFn: () => apiGetBundleList({ page: 1, pageSize: 10 }),
  });

  return { data, isLoading, isError };
};

export default useGetBundleList;
