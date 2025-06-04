import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/upload/apis/getImageId';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto, IBreadItem } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import { IMAGE_REF_TYPE } from '@consts/commons';

import apiModifyBread from '../apis/modify';

const useModifyBread = (bread: IBreadItem) => {
  const { files, setFiles } = useImageFiles();

  const form = useForm<BreadFormDto>({
    resolver: zodResolver(BreadFormDtoSchema),
    defaultValues: {
      name: bread?.name || '',
      description: bread?.description || '',
      price: bread?.price || '',
      isNew: bread?.isNew ?? false,
      isSigniture: bread?.isSignature ?? false,
      isHidden: bread?.isHidden ?? false,
      mbti: bread?.mbti || '',
      sortOrder: bread?.sortOrder || '',
      imageFiles: [],
    },
  });

  const { mutate: modifyBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.MODIFY],
    mutationFn: apiModifyBread,
    onSuccess: () => {
      toast.success(BREAD_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: () => {
      toast.error(BREAD_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const imageId = await getImageId<BreadFormDto, IBreadItem>(data, IMAGE_REF_TYPE.BREAD, bread);

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
