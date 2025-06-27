'use client';

import { COOKIE_KEYS } from '@shared/consts/storage';
import { deleteCookie, getCookie } from '@shared/libs/cookie';
import useMeStore from '@shared/stores/me';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';

import { AUTH_TOAST_MESSAGES } from '@entities/auth/consts';

const LoginExpireToast: FC = () => {
  const queryClient = useQueryClient();
  const setMe = useMeStore(state => state.setMe);

  useEffect(() => {
    const checkLoginExpired = async () => {
      const loginExpired = await getCookie(COOKIE_KEYS.LOGIN_EXPIRED);

      if (loginExpired) {
        toast.warning(AUTH_TOAST_MESSAGES.LOGIN_EXPIRED);
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
