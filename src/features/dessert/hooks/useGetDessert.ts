import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_DESSERT_KEYS } from '@entities/dessert/consts';

import apiGetDessert from '../apis/getDessert';

const useGetDessert = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_DESSERT_KEYS.GET, id],
    queryFn: () => apiGetDessert({ id }),
  });

  return { dessert: data, isLoading, isError };
};

export default useGetDessert;
