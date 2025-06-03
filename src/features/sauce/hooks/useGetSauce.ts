import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_SAUCE_KEYS } from '@entities/sauce/consts';

import apiGetBread from '../apis/getBread';

const useGetSauce = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_SAUCE_KEYS.GET],
    queryFn: () => apiGetBread({ id }),
  });

  return { bread: data, isLoading, isError };
};

export default useGetSauce;
