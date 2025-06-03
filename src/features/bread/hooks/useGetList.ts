import { useQuery } from '@tanstack/react-query';

import { ADMIN_BREAD_KEYS } from '@entities/bread/consts';

import apiGetBreadList from '../apis/getList';

const useGetBreadList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BREAD_KEYS.GET_LIST],
    queryFn: () => apiGetBreadList({ page: 1, pageSize: 10 }),
  });

  return { data, isLoading, isError };
};

export default useGetBreadList;
