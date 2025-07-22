import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BUNDLE_KEYS } from '@entities/bundle/consts';
import { ADMIN_DISH_KEYS, DISH_TOAST_MESSAGES } from '@entities/dish/consts';

import apiDeleteDish from '../apis/delete';

const useDeleteDishListItem = () => {
  const { page } = usePageSearchParams();
  const { queryClient, removeQueryItem } = useRemoveQueryListItem([ADMIN_DISH_KEYS.GET_LIST, page]);

  const { mutateAsync: deleteDish, isPending } = useMutation({
    mutationKey: [ADMIN_DISH_KEYS.DELETE],
    mutationFn: apiDeleteDish,
    onSuccess: async (deletedId: number) => {
      toast.success(DISH_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);

      await queryClient.invalidateQueries({
        queryKey: [ADMIN_BUNDLE_KEYS.GET_LIST],
      });
    },
    onError: error => {
      toast.error(DISH_TOAST_MESSAGES.DELETE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onDelete = async (id: number) => {
    await deleteDish({
      id,
    });
  };

  return {
    onDelete,
    isDeletePending: isPending,
  };
};

export default useDeleteDishListItem;
