import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_DISH_KEYS } from '@entities/dish/consts';

import apiGetDish from '../apis/getDish';

const useGetDish = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_DISH_KEYS.GET, id],
    queryFn: () => apiGetDish({ id }),
  });

  return { dish: data, isLoading, isError };
};

export default useGetDish;
