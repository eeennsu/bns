import { PER_PAGE_SIZE } from '@shared/consts/commons';
import usePageSearchParams from '@shared/hooks/usePageSearchParams';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_BREAD_KEYS } from '@entities/bread/consts';

import apiGetBreadList from '../apis/getList';

const useGetBreadList = () => {
  const { page } = usePageSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BREAD_KEYS.GET_LIST, page],
    queryFn: () => apiGetBreadList({ page, pageSize: PER_PAGE_SIZE.DEFAULT }),
  });

  return { data, isLoading, isError };
};

export default useGetBreadList;
