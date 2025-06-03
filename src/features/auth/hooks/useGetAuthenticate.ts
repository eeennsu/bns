import { useEffect } from 'react';

import useGetSession from '@features/auth/hooks/useGetSession';

import useMeStore from '@stores/me';

const useGetAuthenticate = () => {
  const { session: me, status, error } = useGetSession();
  const setMe = useMeStore(state => state.setMe);

  useEffect(() => {
    if (me && status === 'success') {
      setMe({
        id: me.id,
        username: me.username,
        role: me.role,
        isAuthenticated: true,
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
    isAuthorized: me?.role === 'admin' && me?.isAuthenticated,
  };
};

export default useGetAuthenticate;
