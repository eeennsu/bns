import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_SAUCE_KEYS } from '@entities/sauce/consts';

import apiGetSauce from '../apis/getSauce';

const useGetSauce = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_SAUCE_KEYS.GET, id],
    queryFn: () => apiGetSauce({ id }),
    enabled: !!id,
  });

  return { sauce: data, isLoading, isError };
};

export default useGetSauce;
