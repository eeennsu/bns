import { useQuery } from '@tanstack/react-query';

import { ADMIN_SAUCE_KEYS } from '@entities/sauce/consts';

import apiGetSauceList from '../apis/getList';

const useGetSauceList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_SAUCE_KEYS.GET_LIST],
    queryFn: () => apiGetSauceList({ page: 1, pageSize: 10 }),
  });

  return { data, isLoading, isError };
};

export default useGetSauceList;
