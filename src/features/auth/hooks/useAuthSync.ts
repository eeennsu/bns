import { useEffect } from 'react';

import useGetSession from '@features/auth/hooks/useGetSession';

import useMeStore from '@stores/me';

const useAuthSync = () => {
  const { session, isSuccess, error } = useGetSession();

  const setMe = useMeStore(state => state.setMe);

  const me = session?.user;

  useEffect(() => {
    if (me && isSuccess) {
      setMe({
        username: me.username,
        isAuthenticated: session.isAuthenticated,
      });
    } else if (error) {
      setMe(null);
      console.error('Error on session: ', error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, isSuccess, error]);

  return {
    session,
  };
};

export default useAuthSync;
