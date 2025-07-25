import { zodResolver } from '@hookform/resolvers/zod';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { AUTH_KEYS, AUTH_TOAST_MESSAGES } from '@entities/auth/consts';
import { adminLoginFormDtoSchema } from '@entities/auth/contracts';
import { AdminLoginFormDto } from '@entities/auth/types';

import useMeStore from '@stores/me';

import apiLogin from '../apis/login';

interface IParams {
  closeModal?: () => void;
}

const useLogin = ({ closeModal }: IParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setMe = useMeStore(state => state.setMe);

  const { mutate: login, isPending } = useMutation({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: apiLogin,
    onSuccess: async data => {
      closeModal();
      router.push(ADMIN_PATHS.product.bread.list(), { scroll: true });
      toast.success(AUTH_TOAST_MESSAGES.LOGIN_SUCCESS);
      setMe({
        isAuthenticated: true,
        username: data?.user?.username || null,
      });

      await queryClient.invalidateQueries({
        queryKey: [AUTH_KEYS.SESSION],
      });
    },
    onError: error => {
      console.log(error);
      toast.error(AUTH_TOAST_MESSAGES.LOGIN_FAILED, { description: axiosErrorHandler(error) });
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

  return { form, onSubmit, isLoadingLogin: isPending };
};

export default useLogin;
