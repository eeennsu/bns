import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getMultiImageIds from '@features/image/apis/getMultiImageIdx';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto, IBundleItem } from '@entities/bundle/types';
import { IImageFile } from '@entities/image/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyBundle from '../apis/modify';

const useModifyBundle = (bundle: IBundleItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const dishImage = bundle?.imageFiles;
  const imgs: IImageFile[] = dishImage
    ? bundle?.imageFiles.map(imageFile => ({
        id: imageFile?.id,
        url: imageFile?.url,
        name: imageFile?.name,
      }))
    : [];

  const { files, setFiles } = useImageFiles();

  const form = useForm<BundleFormDto>({
    resolver: zodResolver(BundleFormDtoSchema),
    defaultValues: {
      name: bundle?.name || '',
      description: bundle?.description || '',
      sortOrder: bundle?.sortOrder || '',
      isHidden: bundle?.isHidden ?? false,
      price: bundle?.price || '',
      discountedPrice: bundle?.discountedPrice || '',
      productsList: bundle?.productsList ?? {
        breads: [],
        dishes: [],
        sauces: [],
      },
      imageFiles: imgs,
    },
  });

  const { mutateAsync: modifyBundle } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.MODIFY],
    mutationFn: apiModifyBundle,
    onSuccess: async () => {
      toast.success(BUNDLE_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET, String(bundle?.id)],
        }),
      ]);

      router.replace(ADMIN_PATHS.bundle.list());
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BundleFormDto) => {
    console.log('data', data);
    return;
    const updatedImageIds = await getMultiImageIds<BundleFormDto, IBundleItem>(data, bundle);

    const newData = {
      ...data,
      imageIds: updatedImageIds,
    };

    await modifyBundle({
      id: bundle.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyBundle;
