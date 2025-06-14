import { useEffect } from 'react';

import useGetSession from '@features/auth/hooks/useGetSession';

import useMeStore from '@stores/me';

const useGetAuthenticate = () => {
  const { session, status, error } = useGetSession();
  const setMe = useMeStore(state => state.setMe);

  const me = session?.user;

  useEffect(() => {
    if (!!session?.user && status === 'success') {
      setMe({
        username: me.username,
        isAuthenticated: session.isAuthenticated,
      });
    }

    if (status === 'error' || error) {
      console.error('Error on session: ', error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, status]);

  return {
    me,
    isLoading: status === 'pending',
    isError: status === 'error',
  };
};

export default useGetAuthenticate;
