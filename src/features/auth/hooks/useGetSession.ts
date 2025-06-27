import { useQuery } from '@tanstack/react-query';

import { AUTH_KEYS } from '@entities/auth/consts';

import apiSession from '../apis/session';

const useGetSession = () => {
  const {
    data: session,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: [AUTH_KEYS.SESSION],
    queryFn: apiSession,
    staleTime: 0,
    gcTime: 0,
    retry: 0,
  });

  return {
    session,
    isLoading,
    isSuccess,
    error,
  };
};

export default useGetSession;
