import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';
import { EventFormDtoSchema } from '@entities/event/contracts';
import { EventFormDto } from '@entities/event/types';

import useImageFiles from '@hooks/useImageFiles';

// import { IMAGE_REF_TYPE } from '@consts/commons';

import apiCreateEvent from '../apis/create';

const useCreateEventForm = () => {
  const { files, setFiles } = useImageFiles();
  // const { startUpload } = useUploadImage();

  const form = useForm<EventFormDto>({
    resolver: zodResolver(EventFormDtoSchema),
    defaultValues: {
      // name: '',
      // description: '',
      // price: '',
      // isNew: false,
      // isSigniture: false,
      // isHidden: false,
      // mbti: '',
      // sortOrder: '',
      // imageFiles: [],
    },
  });

  const { mutate: createEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.CREATE],
    mutationFn: apiCreateEvent,
    onSuccess: () => {
      toast.success(EVENT_TOAST_MESSAGES.CREATE_SUCCESS);
    },
    onError: () => {
      toast.error(EVENT_TOAST_MESSAGES.CREATE_FAILED);
    },
  });

  const onSubmit = form.handleSubmit(async (data: EventFormDto) => {
    // const imageIds = await startUpload(files, IMAGE_REF_TYPE.EVENT);

    // delete data.imageFiles;

    const newData = {
      ...data,
    };

    createEvent(newData);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateEventForm;
