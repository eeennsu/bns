import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { adminLoginFormDtoSchema } from '@entities/auth/contracts';
import { AdminLoginFormDto } from '@entities/auth/types';

const useAdminAuthLogin = () => {
  const form = useForm<AdminLoginFormDto>({
    resolver: zodResolver(adminLoginFormDtoSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((data: AdminLoginFormDto) => {
    console.log(data);
  });

  return { form, onSubmit };
};

export default useAdminAuthLogin;
