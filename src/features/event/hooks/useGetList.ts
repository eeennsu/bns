import { useQuery } from '@tanstack/react-query';

import { ADMIN_EVENT_KEYS } from '@entities/event/consts';

import apiGetEventList from '../apis/getList';

const useGetEventList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_EVENT_KEYS.GET_LIST],
    queryFn: () => apiGetEventList({ page: 1, pageSize: 10 }),
  });

  return { data, isLoading, isError };
};

export default useGetEventList;
