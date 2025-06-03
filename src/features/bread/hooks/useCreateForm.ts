import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import { IMAGE_REF_TYPE } from '@consts/commons';

import apiCreateVersion from '../apis/create';

const useCreateBreadForm = () => {
  const { files, setFiles } = useImageFiles();
  const { startUpload } = useUploadImage();

  const form = useForm<BreadFormDto>({
    resolver: zodResolver(BreadFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      isNew: false,
      isSigniture: false,
      isHidden: false,
      mbti: '',
      sortOrder: 0,
      imageFiles: [],
    },
  });

  const { mutate: createBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.CREATE],
    mutationFn: apiCreateVersion,
    onSuccess: () => {
      toast.success(BREAD_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: () => {
      toast.error(BREAD_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const imageIds = await startUpload(files, IMAGE_REF_TYPE.BREAD);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId: imageIds.at(0).imageId,
    };

    createBread(newData);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateBreadForm;
