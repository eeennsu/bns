import { ADMIN_PATHS } from '@configs/routes/adminPaths';
import { zodResolver } from '@hookform/resolvers/zod';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/image/hooks/useUploadImage';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';
import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import apiCreateBread from '../apis/create';

const useCreateBreadForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { fetchUploadApi, files, setFiles } = useUploadImage();

  const form = useForm<BreadFormDto>({
    resolver: zodResolver(BreadFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      isNew: false,
      isSignature: false,
      isHidden: false,
      mbti: '',
      sortOrder: '',
      imageFiles: [],
    },
  });

  const { mutateAsync: createBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.CREATE],
    mutationFn: apiCreateBread,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BREAD_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BUNDLE_KEYS.GET_PRODUCT_LIST],
        }),
      ]);

      toast.success(BREAD_TOAST_MESSAGES.CREATE_SUCCESS);
      router.replace(ADMIN_PATHS.product.bread.list());
    },
    onError: error => {
      toast.error(BREAD_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.BREAD);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createBread(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateBreadForm;
