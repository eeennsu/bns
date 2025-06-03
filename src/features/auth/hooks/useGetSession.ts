import { useQuery } from '@tanstack/react-query';

import { AUTH_KEYS } from '@entities/auth/consts';

import apiSession from '../apis/session';

interface IParams {
  enabled?: boolean;
}

const useGetSession = ({ enabled = true }: IParams = {}) => {
  const {
    data: session,
    isLoading,
    status,
    error,
  } = useQuery({
    queryKey: [AUTH_KEYS.SESSION],
    queryFn: apiSession,
    staleTime: 0,
    gcTime: 0,
    enabled,
  });

  return {
    session,
    isLoading,
    status,
    error,
  };
};

export default useGetSession;
