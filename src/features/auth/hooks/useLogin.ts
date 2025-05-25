import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { AUTH_KEYS } from '@entities/auth/consts';
import { adminLoginFormDtoSchema } from '@entities/auth/contracts';
import { AdminLoginFormDto } from '@entities/auth/types';

import apiLogin from '../apis/login';

interface IParams {
  onCloseModal?: () => void;
}

const useLogin = ({ onCloseModal }: IParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: apiLogin,
    onSuccess: async () => {
      onCloseModal();
      router.push(ADMIN_PATHS.dashboard());
      toast.success('로그인에 성공했습니다.', { position: 'top-right' });

      await queryClient.invalidateQueries({
        queryKey: [AUTH_KEYS.SESSION],
      });
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
