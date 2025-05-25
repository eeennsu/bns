import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MAIN_PATHS } from 'src/shared/configs/routes/mainPaths';

import { AUTH_KEYS } from '@entities/auth/consts';

import apiLogout from '../apis/logout';

interface IParams {
  onCloseModal?: () => void;
}

const useLogout = ({ onCloseModal }: IParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationKey: [AUTH_KEYS.LOGOUT],
    mutationFn: apiLogout,
    onSettled: async () => {
      router.push(MAIN_PATHS.home());
      toast.success('로그아웃 되었습니다.', { position: 'top-right' });
      onCloseModal?.();

      await queryClient.invalidateQueries({
        queryKey: [AUTH_KEYS.SESSION],
      });
    },
  });

  const onLogout = () => {
    logout();
  };

  return onLogout;
};

export default useLogout;
