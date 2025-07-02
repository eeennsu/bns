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
import { ADMIN_DISH_KEYS, DISH_TOAST_MESSAGES } from '@entities/dish/consts';
import { DishFormDtoSchema } from '@entities/dish/contracts';
import { DishFormDto } from '@entities/dish/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateDish from '../apis/create';

const useCreateDishForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { files, setFiles } = useImageFiles();
  const { fetchUploadApi } = useUploadImage();

  const form = useForm<DishFormDto>({
    resolver: zodResolver(DishFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      ingredients: [],
      isNew: false,
      isSignature: false,
      isHidden: false,
      sortOrder: '',
      imageFiles: [],
    },
  });

  const { mutateAsync: createDish } = useMutation({
    mutationKey: [ADMIN_DISH_KEYS.CREATE],
    mutationFn: apiCreateDish,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DISH_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      toast.success(DISH_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(DISH_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
    onSettled: () => {
      router.replace(ADMIN_PATHS.product.dish.list());
    },
  });

  const onSubmit = form.handleSubmit(async (data: DishFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.DISH);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createDish(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateDishForm;
