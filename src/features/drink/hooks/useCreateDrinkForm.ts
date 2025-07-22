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
import { ADMIN_DRINK_KEYS, DRINK_TOAST_MESSAGES } from '@entities/drink/consts';
import { DrinkFormDtoSchema } from '@entities/drink/contracts';
import { DrinkFormDto } from '@entities/drink/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import apiCreateDrink from '../apis/create';

const useCreateDrinkForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchUploadApi, files, setFiles } = useUploadImage();

  const form = useForm<DrinkFormDto>({
    resolver: zodResolver(DrinkFormDtoSchema),
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

  const { mutateAsync: createDrink } = useMutation({
    mutationKey: [ADMIN_DRINK_KEYS.CREATE],
    mutationFn: apiCreateDrink,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DRINK_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      toast.success(DRINK_TOAST_MESSAGES.CREATE_SUCCESS);
      router.replace(ADMIN_PATHS.product.drink.list());
    },
    onError: error => {
      toast.error(DRINK_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: DrinkFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.DRINK);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createDrink(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateDrinkForm;
