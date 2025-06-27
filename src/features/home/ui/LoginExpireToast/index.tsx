'use client';

import { COOKIE_KEYS } from '@shared/consts/storage';
import { deleteCookie, getCookie } from '@shared/libs/cookie';
import useMeStore from '@shared/stores/me';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';

const LoginExpireToast: FC = () => {
  const queryClient = useQueryClient();
  const { setMe } = useMeStore();

  useEffect(() => {
    // if (!me || !me?.isAuthenticated) {
    //   {
    //     console.log('힝 속았지 ㅋㅋ', me);
    //     return;
    //   }
    // }

    const checkLoginExpired = async () => {
      const loginExpired = await getCookie(COOKIE_KEYS.LOGIN_EXPIRED);

      if (loginExpired) {
        toast.info('로그인이 만료되었습니다. 다시 로그인해주세요.');
        queryClient.clear();
        setMe(null);
        await deleteCookie(COOKIE_KEYS.LOGIN_EXPIRED);
      }
    };

    checkLoginExpired();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LoginExpireToast;
