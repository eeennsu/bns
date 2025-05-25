import { useQuery } from '@tanstack/react-query';

import apiSession from '../apis/session';
import { AUTH_KEYS } from '@entities/auth/consts';

interface IParams {
  enabled?: boolean;
}

const useSession = ({ enabled = true }: IParams) => {
  const {
    data: session,
    isLoading,
    status,
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
  };
};

export default useSession;
