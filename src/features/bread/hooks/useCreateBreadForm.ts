import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFiles } from '@libs/uploadImage';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateVersion from '../apis/create';

const useCreateBreadForm = () => {
  const { files, setFiles } = useImageFiles();

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
      imageFiles: [],
    },
  });

  const { mutate: createBread } = useMutation({
    mutationKey: [],
    mutationFn: apiCreateVersion,
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    console.log('data', data);
    const response = await uploadFiles('imageUploader', {
      files,
      onUploadBegin: () => {
        console.log('onUploadBegin');
      },
    });
    createBread({ ...data });
    console.log(response);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateBreadForm;
