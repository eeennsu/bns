import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getMultiImageIds from '@features/image/apis/getMultiImageIdx';

import {
  ADMIN_BUNDLE_KEYS,
  BUNDLE_PRODUCT_TYPE,
  BUNDLE_TOAST_MESSAGES,
} from '@entities/bundle/consts';
import { BundleFormDtoSchema } from '@entities/bundle/contracts';
import { BundleFormDto, IBundleItem, IProduct } from '@entities/bundle/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyBundle from '../apis/modify';

const useModifyBundle = (bundle: IBundleItem, allProducts: IProduct[]) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const bundleImages = bundle?.imageFiles ?? [];

  const { files, setFiles } = useImageFiles(bundleImages);

  const enrichedProducts = useMemo(
    () =>
      (bundle?.products ?? []).map(product => {
        if (!allProducts)
          return {
            id: product.breadId || product.sauceId || product.dishId || product.drinkId || 0,
            type: product.type,
            quantity: product.quantity,
            name: '',
            price: 0,
          };

        let matched: IProduct | undefined;

        switch (product.type) {
          case BUNDLE_PRODUCT_TYPE.BREAD:
            matched = allProducts.find(
              p => p.id === product.breadId && p.type === BUNDLE_PRODUCT_TYPE.BREAD,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.SAUCE:
            matched = allProducts.find(
              p => p.id === product.sauceId && p.type === BUNDLE_PRODUCT_TYPE.SAUCE,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.DISH:
            matched = allProducts.find(
              p => p.id === product.dishId && p.type === BUNDLE_PRODUCT_TYPE.DISH,
            );
            break;

          case BUNDLE_PRODUCT_TYPE.DRINK:
            matched = allProducts.find(
              p => p.id === product.drinkId && p.type === BUNDLE_PRODUCT_TYPE.DRINK,
            );
            break;
        }

        return {
          id:
            matched?.id ||
            product.breadId ||
            product.sauceId ||
            product.dishId ||
            product.drinkId ||
            0,
          type: product.type,
          quantity: product.quantity,
          name: matched?.name ?? '',
          price: matched?.price ?? 0,
        };
      }),
    [allProducts, bundle?.products],
  );

  useEffect(() => {
    if (enrichedProducts.length) {
      form.reset({
        ...form.getValues(),
        products: enrichedProducts,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrichedProducts]);

  const form = useForm<BundleFormDto>({
    resolver: zodResolver(BundleFormDtoSchema),
    defaultValues: {
      name: bundle?.name || '',
      description: bundle?.description || '',
      sortOrder: bundle?.sortOrder || '',
      isHidden: bundle?.isHidden ?? false,
      price: bundle?.price || '',
      discountedPrice: bundle?.discountedPrice || '',
      products: enrichedProducts,
      imageFiles: bundleImages,
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
    const updatedImageIdsWithSortOrder = await getMultiImageIds<BundleFormDto, IBundleItem>(
      data,
      bundle,
    );

    delete data.imageFiles;

    const newData = {
      ...data,
      imageIdsWithSortOrder: updatedImageIdsWithSortOrder,
    };

    await modifyBundle({
      id: bundle.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyBundle;
