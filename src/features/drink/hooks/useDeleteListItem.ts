import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { ADMIN_DRINK_KEYS, DRINK_TOAST_MESSAGES } from '@entities/drink/consts';

import apiDeleteDrink from '../apis/delete';

const useDeleteDrinkListItem = () => {
  const { page } = usePageSearchParams();
  const { queryClient, removeQueryItem } = useRemoveQueryListItem([
    ADMIN_DRINK_KEYS.GET_LIST,
    page,
  ]);

  const { mutateAsync: deleteDrink, isPending } = useMutation({
    mutationKey: [ADMIN_DRINK_KEYS.DELETE],
    mutationFn: apiDeleteDrink,
    onSuccess: async (deletedId: number) => {
      toast.success(DRINK_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
      });
    },
    onError: error => {
      toast.error(DRINK_TOAST_MESSAGES.DELETE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onDelete = async (id: number) => {
    await deleteDrink({
      id,
    });
  };

  return {
    onDelete,
    isDeletePending: isPending,
  };
};

export default useDeleteDrinkListItem;
