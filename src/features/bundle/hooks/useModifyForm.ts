import { zodResolver } from '@hookform/resolvers/zod';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { getErrorResponse } from '@shared/libs/getError';
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

  const { mutate: modifyBundle } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.MODIFY],
    mutationFn: apiModifyBundle,
    onSuccess: () => {
      toast.success(BUNDLE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.CREATE_FAILED, { description: getErrorResponse(error) });
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

    modifyBundle({
      id: bundle.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyBundle;
