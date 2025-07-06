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
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';
import { ADMIN_SAUCE_KEYS, SAUCE_TOAST_MESSAGES } from '@entities/sauce/consts';
import { SauceFormDtoSchema } from '@entities/sauce/contracts';
import { SauceFormDto, ISauceItem } from '@entities/sauce/types';

import apiModifySauce from '../apis/modify';

const useModifySauce = (sauce: ISauceItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const sauceImage = sauce?.imageFiles?.at(0);
  const img: IImageFile[] = sauceImage
    ? [
        {
          id: sauceImage?.id,
          url: sauceImage?.url,
          name: sauceImage?.name,
        },
      ]
    : [];

  const { files, setFiles } = useImageFiles(img);

  const form = useForm<SauceFormDto>({
    resolver: zodResolver(SauceFormDtoSchema),
    defaultValues: {
      name: sauce?.name || '',
      description: sauce?.description || '',
      price: sauce?.price || 0,
      isNew: sauce?.isNew ?? false,
      isSignature: sauce?.isSignature ?? false,
      isHidden: sauce?.isHidden ?? false,
      sortOrder: sauce?.sortOrder,
      imageFiles: img,
    },
  });

  const { mutateAsync: modifySauce } = useMutation({
    mutationKey: [ADMIN_SAUCE_KEYS.MODIFY],
    mutationFn: apiModifySauce,
    onSuccess: async () => {
      toast.success(SAUCE_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_SAUCE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_SAUCE_KEYS.GET, String(sauce?.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      router.replace(ADMIN_PATHS.product.sauce.list());
    },
    onError: error => {
      toast.error(SAUCE_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: SauceFormDto) => {
    const imageId = await getImageId<SauceFormDto, ISauceItem>(data, IMAGE_REF_VALUES.SAUCE, sauce);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await modifySauce({
      id: sauce.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifySauce;
