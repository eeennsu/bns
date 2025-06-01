import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadThing } from '@libs/uploadImage';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import { FILE_UPLOAD_TOAST_MESSAGES } from '@consts/commons';

import apiCreateVersion from '../apis/create';

const useCreateBreadForm = () => {
  const { files, setFiles } = useImageFiles();
  const { startUpload } = useUploadThing('imageUploader', {
    onUploadError: error => {
      console.error('onUploadError: ', error);
    },
    onUploadBegin: () => {
      console.log('onUploadBegin');
    },
    onClientUploadComplete: res => {
      console.log('onClientUploadComplete: ', res);
    },
  });

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
    const fileResponse = await startUpload(files, {
      ref: 'bread',
    } as any);

    if (!fileResponse) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.IMAGE_UPLOAD_FAILED);
      return;
    }

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId: fileResponse[0].serverData.imageId,
    };

    console.log('newData: ', newData);

    createBread(newData);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateBreadForm;
