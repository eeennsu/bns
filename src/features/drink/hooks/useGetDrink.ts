import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_DRINK_KEYS } from '@entities/drink/consts';

import apiGetDrink from '../apis/getDrink';

const useGetDrink = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_DRINK_KEYS.GET, id],
    queryFn: () => apiGetDrink({ id }),
  });

  return { drink: data, isLoading, isError };
};

export default useGetDrink;
