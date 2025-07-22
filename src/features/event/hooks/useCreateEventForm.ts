import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_PATHS } from '@shared/configs/routes/adminPaths';
import { formErrorHandler } from '@shared/libs/formErrorHandler';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/image/hooks/useUploadImage';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';
import { EventFormDtoSchema } from '@entities/event/contracts';
import { EventFormDto } from '@entities/event/types';
import { IMAGE_REF_VALUES } from '@entities/image/consts';

import apiCreateEvent from '../apis/create';

const useCreateEventForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchUploadApi, files, setFiles } = useUploadImage();

  const form = useForm<EventFormDto>({
    resolver: zodResolver(EventFormDtoSchema),
    defaultValues: {
      name: '',
      description: '',
      imageFiles: [],
      sortOrder: '',
      startDate: null,
      endDate: null,
      isHidden: false,
    },
  });

  const { mutateAsync: createEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.CREATE],
    mutationFn: apiCreateEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_EVENT_KEYS.GET_LIST],
      });

      toast.success(EVENT_TOAST_MESSAGES.CREATE_SUCCESS);
      router.replace(ADMIN_PATHS.event.list());
    },
    onError: error => {
      toast.error(EVENT_TOAST_MESSAGES.CREATE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onSubmit = form.handleSubmit(async (data: EventFormDto) => {
    const [imageId] = await fetchUploadApi(data.imageFiles, IMAGE_REF_VALUES.EVENT);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageId,
    };

    await createEvent(newData);
  }, formErrorHandler);

  return { form, onSubmit, files, setFiles };
};

export default useCreateEventForm;
