import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/image/hooks/useUploadImage';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { ADMIN_SAUCE_KEYS, SAUCE_TOAST_MESSAGES } from '@entities/sauce/consts';
import { SauceFormDtoSchema } from '@entities/sauce/contracts';
import { SauceFormDto } from '@entities/sauce/types';

import apiCreateSauce from '../apis/create';

const useCreateSauceForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchUploadApi, files, setFiles } = useUploadImage();

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

  const { mutateAsync: createSauce } = useMutation({
    mutationKey: [ADMIN_SAUCE_KEYS.CREATE],
    mutationFn: apiCreateSauce,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_SAUCE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      toast.success(SAUCE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(SAUCE_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
    onSettled: () => {
      router.replace(ADMIN_PATHS.product.sauce.list());
    },
  });

  const onSubmit = form.handleSubmit(async (data: SauceFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.SAUCE);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createSauce(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateSauceForm;
