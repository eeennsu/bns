import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto } from '@entities/bundle/types';

import useImageFiles from '@hooks/useImageFiles';

import { IMAGE_REF_TYPE } from '@consts/commons';

import apiCreateBundle from '../apis/create';

const useCreateBundleForm = () => {
  const { files, setFiles } = useImageFiles();
  const { startUpload } = useUploadImage();

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
    onError: () => {
      toast.error(BUNDLE_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: BundleFormDto) => {
      console.log(data);
      return;
      const imageIds = await startUpload(files, IMAGE_REF_TYPE.BUNDLE);
      const newData = {
        ...data,
        imageIds,
      };

      createBundle(newData);
    },
    error => {
      console.log('error', error);
      if (error?.productsList?.message) {
        toast.warning(error.productsList.message);
      }
    },
  );

  return { form, onSubmit, files, setFiles };
};

export default useCreateBundleForm;
