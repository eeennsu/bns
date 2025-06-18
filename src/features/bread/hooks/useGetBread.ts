import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_BREAD_KEYS } from '@entities/bread/consts';

import apiGetBread from '../apis/getBread';

const useGetBread = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BREAD_KEYS.GET, id],
    queryFn: () => apiGetBread({ id }),
    enabled: !!id,
  });

  return { bread: data, isLoading, isError };
};

export default useGetBread;
