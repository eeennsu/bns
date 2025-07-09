import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import useImageFiles from '@shared/hooks/useImageFiles';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/image/apis/getImageId';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { ADMIN_DISH_KEYS, DISH_TOAST_MESSAGES } from '@entities/dish/consts';
import { DishFormDtoSchema } from '@entities/dish/contracts';
import { DishFormDto, IDishItem } from '@entities/dish/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';

import apiModifyDish from '../apis/modify';

const useModifyDish = (dish: IDishItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const dishImage = dish?.imageFiles?.at(0);
  const img: IImageFile[] = dishImage
    ? [
        {
          id: dishImage?.id,
          url: dishImage?.url,
          name: dishImage?.name,
        },
      ]
    : [];

  const { files, setFiles } = useImageFiles(img);

  const form = useForm<DishFormDto>({
    resolver: zodResolver(DishFormDtoSchema),
    defaultValues: {
      name: dish?.name || '',
      description: dish?.description || '',
      price: dish?.price || 0,
      ingredients: dish.ingredients || [],
      isNew: dish?.isNew ?? false,
      isSignature: dish?.isSignature ?? false,
      isHidden: dish?.isHidden ?? false,
      sortOrder: dish?.sortOrder,
      imageFiles: img,
    },
  });

  const { mutateAsync: modifyDish } = useMutation({
    mutationKey: [ADMIN_DISH_KEYS.MODIFY],
    mutationFn: apiModifyDish,
    onSuccess: async () => {
      toast.success(DISH_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DISH_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DISH_KEYS.GET, String(dish?.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      router.replace(ADMIN_PATHS.product.dish.list());
    },
    onError: error => {
      toast.error(DISH_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: DishFormDto) => {
    const imageId = await getImageId<DishFormDto, IDishItem>(data, IMAGE_REF_VALUES.DISH, dish);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await modifyDish({
      id: dish.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyDish;
