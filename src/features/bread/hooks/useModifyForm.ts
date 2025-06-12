import { ADMIN_PATHS } from '@configs/routes/adminPaths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/upload/apis/getImageId';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto, IBreadItem } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyBread from '../apis/modify';

const useModifyBread = (bread: IBreadItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const breadImage = bread.imageFiles[0];

  const img = {
    id: breadImage.id,
    url: breadImage.url,
  };

  const form = useForm<BreadFormDto>({
    resolver: zodResolver(BreadFormDtoSchema),
    defaultValues: {
      name: bread?.name || '',
      description: bread?.description || '',
      price: bread?.price || '',
      isNew: bread?.isNew ?? false,
      isSignature: bread?.isSignature ?? false,
      isHidden: bread?.isHidden ?? false,
      mbti: bread?.mbti || '',
      sortOrder: bread?.sortOrder || '',
      imageFiles: img ? [img] : [],
    },
  });

  const { files, setFiles } = useImageFiles();

  const { mutate: modifyBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.MODIFY],
    mutationFn: apiModifyBread,
    onSuccess: async () => {
      toast.success(BREAD_TOAST_MESSAGES.CREATE_SUCCESS);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BREAD_KEYS.GET_LIST],
      });

      router.push(ADMIN_PATHS.product.bread.list());
    },
    onError: () => {
      toast.error(BREAD_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const imageId = await getImageId<BreadFormDto, IBreadItem>(data, bread);

    const newData = {
      ...data,
      imageId,
    };

    modifyBread({
      id: bread.id,
      data: newData,
    });
  });

  return { form, onSubmit, files, setFiles };
};
export default useModifyBread;
