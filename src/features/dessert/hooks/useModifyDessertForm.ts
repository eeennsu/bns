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
import { ADMIN_DESSERT_KEYS, DESSERT_TOAST_MESSAGES } from '@entities/dessert/consts';
import { DessertFormDtoSchema } from '@entities/dessert/contracts';
import { DessertFormDto, IDessertItem } from '@entities/dessert/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';

import apiModifyDessert from '../apis/modify';

const useModifyDessert = (dessert: IDessertItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const dessertImage = dessert?.imageFiles?.at(0);
  const img: IImageFile[] = dessertImage
    ? [
        {
          id: dessertImage?.id,
          url: dessertImage?.url,
          name: dessertImage?.name,
        },
      ]
    : [];

  const { files, setFiles } = useImageFiles(img);

  const form = useForm<DessertFormDto>({
    resolver: zodResolver(DessertFormDtoSchema),
    defaultValues: {
      name: dessert?.name || '',
      description: dessert?.description || '',
      price: dessert?.price || 0,
      isNew: dessert?.isNew ?? false,
      isSignature: dessert?.isSignature ?? false,
      isHidden: dessert?.isHidden ?? false,
      sortOrder: dessert?.sortOrder,
      imageFiles: img,
    },
  });

  const { mutateAsync: modifyDessert } = useMutation({
    mutationKey: [ADMIN_DESSERT_KEYS.MODIFY],
    mutationFn: apiModifyDessert,
    onSuccess: async () => {
      toast.success(DESSERT_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DESSERT_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_DESSERT_KEYS.GET, String(dessert?.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      router.replace(ADMIN_PATHS.product.dessert.list());
    },
    onError: error => {
      toast.error(DESSERT_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: DessertFormDto) => {
    const imageId = await getImageId<DessertFormDto, IDessertItem>(
      data,
      IMAGE_REF_VALUES.DESSERT,
      dessert,
    );

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await modifyDessert({
      id: dessert.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyDessert;
