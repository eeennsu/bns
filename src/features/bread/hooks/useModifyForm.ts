import { ADMIN_PATHS } from '@configs/routes/adminPaths';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/upload/apis/getImageId';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto, IBreadItem } from '@entities/bread/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyBread from '../apis/modify';

const useModifyBread = (bread: IBreadItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const breadImage = bread.imageFiles.at(0);

  const img: IImageFile[] = breadImage
    ? [
        {
          id: breadImage?.id,
          url: breadImage?.url,
          name: breadImage?.name,
        },
      ]
    : [];

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
      imageFiles: img,
    },
  });

  const { files, setFiles } = useImageFiles(img);

  const { mutateAsync: modifyBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.MODIFY],
    mutationFn: apiModifyBread,
    onSuccess: async () => {
      toast.success(BREAD_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BREAD_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_BREAD_KEYS.GET, String(bread.id)],
        }),
      ]);

      router.push(ADMIN_PATHS.product.bread.list());
    },
    onError: error => {
      toast.error(BREAD_TOAST_MESSAGES.MODIFY_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const imageId = await getImageId<BreadFormDto, IBreadItem>(data, IMAGE_REF_VALUES.BREAD, bread);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await modifyBread({
      id: bread.id,
      data: newData,
    });
  });

  return { form, onSubmit, files, setFiles };
};
export default useModifyBread;
