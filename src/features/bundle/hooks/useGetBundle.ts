import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';

import apiGetBundle from '../apis/getBundle';

const useGetBundle = () => {
  const params = useParams();
  const id = (params?.id || '') as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADMIN_BUNDLE_KEYS.GET, id],
    queryFn: () => apiGetBundle({ id }),
  });

  return { bundle: data, isLoading, isError };
};

export default useGetBundle;
