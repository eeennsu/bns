import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/image/apis/getImageId';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';
import { EventFormDtoSchema } from '@entities/event/contracts';
import { EventFormDto, IEventItem } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';
import { IImageFile } from '@entities/image/types';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyEvent from '../apis/modify';

const useModifyEvent = (event: IEventItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const eventImage = event?.imageFiles?.at(0);
  const img: IImageFile[] = eventImage
    ? [
        {
          id: eventImage?.id,
          url: eventImage?.url,
          name: eventImage?.name,
        },
      ]
    : [];

  const { files, setFiles } = useImageFiles(img);

  const form = useForm<EventFormDto>({
    resolver: zodResolver(EventFormDtoSchema),
    defaultValues: {
      name: event?.name || '',
      description: event?.description || '',
      // dateRange: {
      //   from: event?.startDate || '',
      //   to: event?.endDate || '',
      // },
      startDate: (event?.startDate as Date) || null,
      endDate: (event?.endDate as Date) || null,
      imageFiles: img,
      sortOrder: event?.sortOrder || '',
      isHidden: event?.isHidden ?? false,
    },
  });

  const { mutateAsync: modifyEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.MODIFY],
    mutationFn: apiModifyEvent,
    onSuccess: async () => {
      toast.success(EVENT_TOAST_MESSAGES.MODIFY_SUCCESS);

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [ADMIN_EVENT_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [ADMIN_EVENT_KEYS.GET, String(event?.id)],
        }),
      ]);

      router.replace(ADMIN_PATHS.event.list());
    },
    onError: error => {
      toast.error(EVENT_TOAST_MESSAGES.MODIFY_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: EventFormDto) => {
    const imageId = await getImageId<EventFormDto, IEventItem>(data, IMAGE_REF_VALUES.EVENT, event);

    const newData = {
      ...data,
      imageId,
    };

    await modifyEvent({
      id: event.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyEvent;
