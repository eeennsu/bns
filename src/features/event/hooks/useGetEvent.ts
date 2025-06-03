import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_EVENT_KEYS } from '@entities/event/consts';

import apiGetEvent from '../apis/getEvent';

const useGetEvent = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_EVENT_KEYS.GET],
    queryFn: () => apiGetEvent({ id }),
  });

  return { event: data, isLoading, isError };
};

export default useGetEvent;
