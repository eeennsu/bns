import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_SAUCE_KEYS, SAUCE_TOAST_MESSAGES } from '@entities/sauce/consts';

import apiDeleteSauce from '../apis/delete';

const useDeleteSauceListItem = () => {
  const { page } = usePageSearchParams();
  const { removeQueryItem } = useRemoveQueryListItem([ADMIN_SAUCE_KEYS.GET_LIST, page]);

  const { mutate: deleteSauce } = useMutation({
    mutationKey: [ADMIN_SAUCE_KEYS.DELETE],
    mutationFn: apiDeleteSauce,
    onSuccess: async (deletedId: number) => {
      toast.success(SAUCE_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);
    },
    onError: error => {
      toast.error(SAUCE_TOAST_MESSAGES.DELETE_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onDelete = (id: number) => {
    deleteSauce({
      id,
    });
  };

  return onDelete;
};

export default useDeleteSauceListItem;
