import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/upload/apis/getImageId';

import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { ADMIN_SAUCE_KEYS, SAUCE_TOAST_MESSAGES } from '@entities/sauce/consts';
import { SauceFormDtoSchema } from '@entities/sauce/contracts';
import { SauceFormDto, ISauceItem } from '@entities/sauce/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifySauce from '../apis/modify';

const useModifySauce = (sauce: ISauceItem) => {
  const { files, setFiles } = useImageFiles();

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
      imageFiles: [],
    },
  });

  const { mutate: modifySauce } = useMutation({
    mutationKey: [ADMIN_SAUCE_KEYS.MODIFY],
    mutationFn: apiModifySauce,
    onSuccess: () => {
      toast.success(SAUCE_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(SAUCE_TOAST_MESSAGES.CREATE_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: SauceFormDto) => {
    const imageId = await getImageId<SauceFormDto, ISauceItem>(data, IMAGE_REF_VALUES.SAUCE, sauce);

    const newData = {
      ...data,
      imageId,
    };

    modifySauce({
      id: sauce.id,
      data: newData,
    });
  });

  return { form, onSubmit, files, setFiles };
};
export default useModifySauce;
