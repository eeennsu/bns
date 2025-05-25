import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { AUTH_KEYS } from '@entities/auth/consts';
import { adminLoginFormDtoSchema } from '@entities/auth/contracts';
import { AdminLoginFormDto } from '@entities/auth/types';

import useMeStore from '@stores/me';

import apiLogin from '../apis/login';

interface IParams {
  onCloseLoginModal: () => void;
}

const useLogin = ({ onCloseLoginModal }: IParams) => {
  const router = useRouter();
  const setMe = useMeStore(state => state.setMe);

  const { mutate: login } = useMutation({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: apiLogin,
    onSuccess: data => {
      onCloseLoginModal();
      router.push(ADMIN_PATHS.dashboard());
      toast.success('로그인에 성공했습니다.', { position: 'top-right' });
      setMe({ isLogin: true, role: data.role });
    },
    onError: () => {
      toast.error('로그인에 실패했습니다.');
    },
  });

  const form = useForm<AdminLoginFormDto>({
    resolver: zodResolver(adminLoginFormDtoSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((data: AdminLoginFormDto) => {
    login({ ...data });
  });

  return { form, onSubmit };
};

export default useLogin;
