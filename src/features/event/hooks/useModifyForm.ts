import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';
import { EventFormDtoSchema } from '@entities/event/contracts';
import { EventFormDto, IEventItem } from '@entities/event/types';

import useImageFiles from '@hooks/useImageFiles';

// import { IMAGE_REF_TYPE } from '@consts/commons';

import apiModifyEvent from '../apis/modify';

const useModifyEvent = (event: IEventItem) => {
  const { files, setFiles } = useImageFiles();

  const form = useForm<EventFormDto>({
    resolver: zodResolver(EventFormDtoSchema),
    defaultValues: {
      // name: event?.name || '',
      // description: event?.description || '',
      // price: event?.price || 0,
      // isNew: event?.isNew ?? false,
      // isSigniture: event?.isSignature ?? false,
      // isHidden: event?.isHidden ?? false,
      // mbti: event?.mbti || '',
      // sortOrder: event?.sortOrder,
      // imageFiles: [],
    },
  });

  const { mutate: modifyEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.MODIFY],
    mutationFn: apiModifyEvent,
    onSuccess: () => {
      toast.success(EVENT_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: () => {
      toast.error(EVENT_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: EventFormDto) => {
    // multi image
    // const imageId = await getImageId<EventFormDto, IEventItem>(data, IMAGE_REF_TYPE.EVENT, event);

    const newData = {
      ...data,
    };

    modifyEvent({
      id: event.id,
      data: newData,
    });
  });

  return { form, onSubmit, files, setFiles };
};
export default useModifyEvent;
