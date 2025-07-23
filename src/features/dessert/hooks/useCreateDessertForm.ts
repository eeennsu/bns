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
import { ADMIN_DESSERT_KEYS, DESSERT_TOAST_MESSAGES } from '@entities/dessert/consts';
import { DessertFormDtoSchema } from '@entities/dessert/contracts';
import { DessertFormDto } from '@entities/dessert/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import apiCreateDessert from '../apis/create';

const useCreateDessertForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchUploadApi, files, setFiles } = useUploadImage();

  const form = useForm<DessertFormDto>({
    resolver: zodResolver(DessertFormDtoSchema),
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

  const { mutateAsync: createDessert } = useMutation({
    mutationKey: [ADMIN_DESSERT_KEYS.CREATE],
    mutationFn: apiCreateDessert,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DESSERT_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      toast.success(DESSERT_TOAST_MESSAGES.CREATE_SUCCESS);
      router.replace(ADMIN_PATHS.product.dessert.list());
    },
    onError: error => {
      toast.error(DESSERT_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: DessertFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.DESSERT);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createDessert(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateDessertForm;
