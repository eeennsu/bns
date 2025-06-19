import { zodResolver } from '@hookform/resolvers/zod';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import getImageId from '@features/upload/apis/getImageId';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';
import { EventFormDtoSchema } from '@entities/event/contracts';
import { EventFormDto, IEventItem } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import useImageFiles from '@hooks/useImageFiles';

import apiModifyEvent from '../apis/modify';

const useModifyEvent = (event: IEventItem) => {
  const { files, setFiles } = useImageFiles();

  const form = useForm<EventFormDto>({
    resolver: zodResolver(EventFormDtoSchema),
    defaultValues: {
      name: event?.name || '',
      description: event?.description || '',
      dateRange: {
        from: event?.startDate || '',
        to: event?.endDate || '',
      },
      imageFiles: [],
      sortOrder: event?.sortOrder || '',
    },
  });

  const { mutate: modifyEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.MODIFY],
    mutationFn: apiModifyEvent,
    onSuccess: () => {
      toast.success(EVENT_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: error => {
      toast.error(EVENT_TOAST_MESSAGES.CREATE_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: EventFormDto) => {
    const imageId = await getImageId<EventFormDto, IEventItem>(data, IMAGE_REF_VALUES.EVENT, event);

    const newData = {
      ...data,
      imageId,
    };

    modifyEvent({
      id: event.id,
      data: newData,
    });
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};
export default useModifyEvent;
