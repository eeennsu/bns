import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { ADMIN_DESSERT_KEYS, DESSERT_TOAST_MESSAGES } from '@entities/dessert/consts';

import apiDeleteDessert from '../apis/delete';

const useDeleteDessertListItem = () => {
  const { page } = usePageSearchParams();
  const { queryClient, removeQueryItem } = useRemoveQueryListItem([
    ADMIN_DESSERT_KEYS.GET_LIST,
    page,
  ]);

  const { mutateAsync: deleteDessert, isPending } = useMutation({
    mutationKey: [ADMIN_DESSERT_KEYS.DELETE],
    mutationFn: apiDeleteDessert,
    onSuccess: async (deletedId: number) => {
      toast.success(DESSERT_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
      });
    },
    onError: error => {
      toast.error(DESSERT_TOAST_MESSAGES.DELETE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onDelete = async (id: number) => {
    await deleteDessert({
      id,
    });
  };

  return {
    onDelete,
    isDeletePending: isPending,
  };
};

export default useDeleteDessertListItem;
