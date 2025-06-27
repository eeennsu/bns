import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { getErrorResponse } from '@shared/libs/getError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_EVENT_KEYS, EVENT_TOAST_MESSAGES } from '@entities/event/consts';

import apiDeleteEvent from '../apis/delete';

const useDeleteEventListItem = () => {
  const { page } = usePageSearchParams();
  const { removeQueryItem } = useRemoveQueryListItem([ADMIN_EVENT_KEYS.GET_LIST, page]);

  const { mutate: deleteEvent } = useMutation({
    mutationKey: [ADMIN_EVENT_KEYS.DELETE],
    mutationFn: apiDeleteEvent,
    onSuccess: async (deletedId: number) => {
      toast.success(EVENT_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);
    },
    onError: error => {
      toast.error(EVENT_TOAST_MESSAGES.DELETE_FAILED, { description: getErrorResponse(error) });
    },
  });

  const onDelete = (id: number) => {
    deleteEvent({
      id,
    });
  };

  return onDelete;
};

export default useDeleteEventListItem;
