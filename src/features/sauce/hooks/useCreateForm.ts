import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_SAUCE_KEYS, SAUCE_TOAST_MESSAGES } from '@entities/sauce/consts';
import { SauceFormDtoSchema } from '@entities/sauce/contracts';
import { SauceFormDto } from '@entities/sauce/types';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateVersion from '../apis/create';

const useCreateSauceForm = () => {
  const { files, setFiles } = useImageFiles();
  const { fetchUploadApi } = useUploadImage();

  const form = useForm<SauceFormDto>({
    resolver: zodResolver(SauceFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      isNew: false,
      isSignature: false,
      isHidden: false,
      sortOrder: '',
      imageFiles: [],
    },
  });

  const { mutate: createSauce } = useMutation({
    mutationKey: [ADMIN_SAUCE_KEYS.CREATE],
    mutationFn: apiCreateVersion,
    onSuccess: () => {
      toast.success(SAUCE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: () => {
      toast.error(SAUCE_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: SauceFormDto) => {
    const imageIds = await fetchUploadApi(data.imageFiles, 'sauce');
    delete data.imageFiles;

    const newData = {
      ...data,
      imageIds,
    };
    createSauce(newData);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateSauceForm;
