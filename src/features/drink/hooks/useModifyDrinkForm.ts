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
import { ADMIN_DRINK_KEYS, DRINK_TOAST_MESSAGES } from '@entities/drink/consts';
import { DrinkFormDtoSchema } from '@entities/drink/contracts';
import { DrinkFormDto, IDrinkItem } from '@entities/drink/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';

import apiModifyDrink from '../apis/modify';

const useModifyDrink = (drink: IDrinkItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const drinkImage = drink?.imageFiles?.at(0);
  const img: IImageFile[] = drinkImage
    ? [
        {
          id: drinkImage?.id,
          url: drinkImage?.url,
          name: drinkImage?.name,
        },
      ]
    : [];

  const { files, setFiles } = useImageFiles(img);

  const form = useForm<DrinkFormDto>({
    resolver: zodResolver(DrinkFormDtoSchema),
    defaultValues: {
      name: drink?.name || '',
      description: drink?.description || '',
      price: drink?.price || 0,
      isNew: drink?.isNew ?? false,
      isSignature: drink?.isSignature ?? false,
      isHidden: drink?.isHidden ?? false,
      sortOrder: drink?.sortOrder,
      imageFiles: img,
    },
  });

  const { mutateAsync: modifyDrink } = useMutation({
    mutationKey: [ADMIN_DRINK_KEYS.MODIFY],
    mutationFn: apiModifyDrink,
    onSuccess: async () => {
      toast.success(DRINK_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DRINK_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DRINK_KEYS.GET, String(drink?.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      router.replace(ADMIN_PATHS.product.drink.list());
    },
    onError: error => {
      toast.error(DRINK_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: DrinkFormDto) => {
    const imageId = await getImageId<DrinkFormDto, IDrinkItem>(data, IMAGE_REF_VALUES.DRINK, drink);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await modifyDrink({
      id: drink.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyDrink;
