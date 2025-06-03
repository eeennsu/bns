import { useEffect } from 'react';

import useGetSession from '@features/auth/hooks/useGetSession';
import useLogout from '@features/auth/hooks/useLogout';

import useMeStore from '@stores/me';

const useGetAuthenticate = () => {
  const { session: me, status, error } = useGetSession();
  const setMe = useMeStore(state => state.setMe);
  const onLogout = useLogout();

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
      onLogout();
      console.error('Error on session: ', error);
      throw new Error('인증 과정 중 알 수 없는 에러가 발생하였습니다.');
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
