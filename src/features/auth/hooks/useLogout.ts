import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { AUTH_KEYS } from '@entities/auth/consts';

import useMeStore from '@stores/me';

import apiLogout from '../apis/logout';

interface IParams {
  onCloseModal?: () => void;
  navigatePath?: string;
}

const useLogout = ({ onCloseModal, navigatePath = MAIN_PATHS.home() }: IParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setMe = useMeStore(state => state.setMe);

  const { mutate: logout } = useMutation({
    mutationKey: [AUTH_KEYS.LOGOUT],
    mutationFn: apiLogout,
    onError: error => {
      console.error('Logout Error : ', error);
    },
    onSettled: async () => {
      router.push(navigatePath);
      setMe(null);
      toast.info('로그아웃 되었습니다.', { position: 'top-right' });
      onCloseModal?.();
      queryClient.clear();
    },
  });

  const onLogout = () => {
    logout();
  };

  return onLogout;
};

export default useLogout;
