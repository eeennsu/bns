import { useEffect } from 'react';

import useSession from '@features/auth/hooks/useSession';

import useMeStore from '@stores/me';

const useSetAuth = () => {
  const { session: me, status } = useSession();
  const setMe = useMeStore(state => state.setMe);

  useEffect(() => {
    if (me && status === 'success') {
      setMe(me);
    }

    if (status === 'error') {
      setMe(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, status]);
};

export default useSetAuth;
