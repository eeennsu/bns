import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/image/hooks/useUploadImage';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto } from '@entities/bundle/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateBundle from '../apis/create';

const useCreateBundleForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
      productsList: {
        breads: [],
        sauces: [],
        dishes: [],
      },
    },
  });

  const { mutateAsync: createBundle } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.CREATE],
    mutationFn: apiCreateBundle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
      });

      toast.success(BUNDLE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
    onSettled: () => {
      router.replace(ADMIN_PATHS.bundle.list());
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: BundleFormDto) => {
      const imageIds = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.BUNDLE);

      delete data.imageFiles;
      console.log('imageIds', imageIds);

      return;

      const newData = {
        ...data,
        imageIds,
      };

      await createBundle(newData);
    },
    errors => {
      console.log(errors);
      formErrorHandler(errors);
    },
  );

  return { form, onSubmit, files, setFiles };
};

export default useCreateBundleForm;
