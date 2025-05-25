import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { AUTH_KEYS } from '@entities/auth/consts';

import useMeStore from '@stores/me';

import apiLogout from '../apis/logout';

const useLogout = () => {
  const router = useRouter();
  const setMe = useMeStore(state => state.setMe);

  const { mutate: logout } = useMutation({
    mutationKey: [AUTH_KEYS.LOGOUT],
    mutationFn: apiLogout,
    onSettled: () => {
      router.push(MAIN_PATHS.home());
      toast.success('로그아웃 되었습니다.', { position: 'top-right' });
      setMe({ isLogin: false, role: 'user' });
    },
  });

  const onLogout = () => {
    logout();
  };

  return onLogout;
};

export default useLogout;
