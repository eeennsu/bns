import { zodResolver } from '@hookform/resolvers/zod';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getMultiImageIds from '@features/upload/apis/getMultiImageIdx';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto, IBundleItem } from '@entities/bundle/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyBundle from '../apis/modify';

const useModifyBundle = (bundle: IBundleItem) => {
  const { files, setFiles } = useImageFiles();

  const form = useForm<BundleFormDto>({
    resolver: zodResolver(BundleFormDtoSchema),
    defaultValues: {
      name: bundle?.name || '',
      description: bundle?.description || '',
      imageFiles: [],
      sortOrder: bundle?.sortOrder || '',
      isHidden: bundle?.isHidden ?? false,
      discountedPrice: bundle?.discountedPrice || '',
      productsList: bundle?.productsList || [],
    },
  });

  const { mutateAsync: modifyBundle } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.MODIFY],
    mutationFn: apiModifyBundle,
    onSuccess: () => {
      toast.success(BUNDLE_TOAST_MESSAGES.MODIFY_SUCCESS);
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BundleFormDto) => {
    const updatedImageIds = await getMultiImageIds<BundleFormDto, IBundleItem>(
      data,

      bundle,
    );

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
