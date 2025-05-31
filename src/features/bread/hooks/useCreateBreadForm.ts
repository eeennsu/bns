import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';

import apiCreateVersion from '../apis/create';

const useCreateBreadForm = () => {
  const form = useForm<BreadFormDto>({
    resolver: zodResolver(BreadFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      isNew: false,
      isSigniture: false,
      mbti: '',
      sortOrder: '',
    },
  });

  const { mutate: createBread } = useMutation({
    mutationKey: [],
    mutationFn: apiCreateVersion,
  });

  const onSubmit = form.handleSubmit((data: BreadFormDto) => {
    console.log(data);
    createBread({ ...data });
  });

  return { form, onSubmit };
};

export default useCreateBreadForm;
