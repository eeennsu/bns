import { filterQueryKeys } from '@shared/libs/buildQuery';
import { useQuery } from '@tanstack/react-query';

import { ADMIN_EVENT_KEYS } from '@entities/event/consts';
import { IEventList } from '@entities/event/types';

import apiGetEventList from '../apis/getList';

// interface IParams {
//   orderBy: string;
// }

interface IReturn {
  data: IEventList;
  isLoading: boolean;
  isError: boolean;
}

const useGetEventList = (): IReturn => {
  const { data, isLoading, isError } = useQuery({
    queryKey: filterQueryKeys([ADMIN_EVENT_KEYS.GET_LIST]),
    queryFn: () => apiGetEventList({ page: 1, pageSize: 10 }),
  });

  return { data, isLoading, isError };
};

export default useGetEventList;
