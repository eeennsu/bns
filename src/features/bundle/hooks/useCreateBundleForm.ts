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

import apiCreateBundle from '../apis/create';

const useCreateBundleForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchUploadApi, files, setFiles } = useUploadImage();

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
      products: [],
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
      router.replace(ADMIN_PATHS.bundle.list());
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BundleFormDto) => {
    const imageIds = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.BUNDLE);

    delete data.imageFiles;
    delete data.products;

    if (isNaN(Number(data?.discountedPrice))) {
      delete data.discountedPrice;
    }

    const newData = {
      ...data,
      imageIds,
    };

    await createBundle(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateBundleForm;
