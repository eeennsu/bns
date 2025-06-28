import { zodResolver } from '@hookform/resolvers/zod';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto } from '@entities/bundle/types';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateBundle from '../apis/create';

const useCreateBundleForm = () => {
  const { files, setFiles } = useImageFiles();
  const { fetchUploadApi } = useUploadImage();

  const form = useForm<BundleFormDto>({
    resolver: zodResolver(BundleFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      discountedPrice: '',
      imageFiles: [],
      isHidden: false,
      sortOrder: '',
      productsList: [],
    },
  });

  const { mutate: createBundle } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.CREATE],
    mutationFn: apiCreateBundle,
    onSuccess: () => {
      toast.success(BUNDLE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BundleFormDto) => {
    const imageIds = await fetchUploadApi(data.imageFiles, 'bundle');

    delete data.imageFiles;

    const newData = {
      ...data,
      imageIds,
    };

    createBundle(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateBundleForm;
