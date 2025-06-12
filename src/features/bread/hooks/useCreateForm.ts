import { ADMIN_PATHS } from '@configs/routes/adminPaths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useUploadImage from '@features/upload/hooks/useUploadImage';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { BreadFormDtoSchema } from '@entities/bread/contracts';
import { BreadFormDto } from '@entities/bread/types';

import useImageFiles from '@hooks/useImageFiles';

import apiCreateBread from '../apis/create';

const useCreateBreadForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { files, setFiles } = useImageFiles();
  const { startUpload } = useUploadImage();

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

  const { mutate: createBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.CREATE],
    mutationFn: apiCreateBread,
    onSuccess: async () => {
      toast.success(BREAD_TOAST_MESSAGES.CREATE_SUCCESS);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BREAD_KEYS.GET_LIST],
      });
    },
    onError: () => {
      toast.error(BREAD_TOAST_MESSAGES.CREATE_FAILED);
    },
    onSettled: () => {
      router.push(ADMIN_PATHS.product.bread.list());
    },
  });

  const onSubmit = form.handleSubmit(async (data: BreadFormDto) => {
    const imageUrls = await startUpload(files);

    delete data.imageFiles;

    const newData = {
      ...data,
      imageUrls,
    };

    createBread(newData);
  });

  return { form, onSubmit, files, setFiles };
};

export default useCreateBreadForm;
