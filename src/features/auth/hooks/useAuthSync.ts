import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import useGetSession from '@features/auth/hooks/useGetSession';

import useMeStore from '@stores/me';

const useAuthSync = () => {
  const { session, isLoading, isSuccess, error } = useGetSession();
  const router = useRouter();
  const setMe = useMeStore(state => state.setMe);
  const queryClient = useQueryClient();

  const me = session?.user;

  useEffect(() => {
    if (me && isSuccess) {
      setMe({
        username: me.username,
        isAuthenticated: session.isAuthenticated,
      });
    } else if (error) {
      console.error('Error on session: ', error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, isSuccess, error]);

  useEffect(() => {
    if (!isLoading && (!!error || !session.isAuthorized)) {
      router.replace(MAIN_PATHS.home());
      setMe(null);
      toast.error('로그인이 만료되었습다. 다시 로그인해주세요.');
      queryClient.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error, session.isAuthorized]);
};

export default useAuthSync;
