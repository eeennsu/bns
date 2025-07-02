import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';
import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';

import apiDeleteBread from '../apis/delete';

const useDeleteBreadListItem = () => {
  const { page } = usePageSearchParams();
  const { queryClient, removeQueryItem } = useRemoveQueryListItem([
    ADMIN_BREAD_KEYS.GET_LIST,
    page,
  ]);

  const { mutateAsync: deleteBread, isPending } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.DELETE],
    mutationFn: apiDeleteBread,
    onSuccess: async (deletedId: number) => {
      toast.success(BREAD_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
      });
    },
    onError: error => {
      toast.error(BREAD_TOAST_MESSAGES.DELETE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onDelete = async (id: number) => {
    await deleteBread({
      id,
    });
  };

  return {
    onDelete,
    isDeletePending: isPending,
  };
};

export default useDeleteBreadListItem;
