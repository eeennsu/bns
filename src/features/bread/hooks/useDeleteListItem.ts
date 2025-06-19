import usePageSearchParams from '@shared/hooks/usePageSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BREAD_KEYS, BREAD_TOAST_MESSAGES } from '@entities/bread/consts';

import apiDeleteBread from '../apis/delete';

const useDeleteBreadListItem = () => {
  const { page } = usePageSearchParams();
  const { removeQueryItem } = useRemoveQueryListItem([ADMIN_BREAD_KEYS.GET_LIST, page]);

  const { mutate: deleteBread } = useMutation({
    mutationKey: [ADMIN_BREAD_KEYS.DELETE],
    mutationFn: apiDeleteBread,
    onSuccess: async (deletedId: number) => {
      toast.success(BREAD_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);
    },
    onError: error => {
      toast.error(BREAD_TOAST_MESSAGES.DELETE_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onDelete = (id: number) => {
    deleteBread({
      id,
    });
  };

  return onDelete;
};

export default useDeleteBreadListItem;
