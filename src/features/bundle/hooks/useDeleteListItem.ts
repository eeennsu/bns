import usePageSearchParams from '@shared/hooks/useListSearchParams';
import useRemoveQueryListItem from '@shared/hooks/useRemoveQueryListItem';
import { axiosErrorHandler } from '@shared/utils/axios/utilError';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMIN_BUNDLE_KEYS, BUNDLE_TOAST_MESSAGES } from '@entities/bundle/consts';

import apiDeleteBundle from '../apis/delete';

const useDeleteBundleListItem = () => {
  const { page } = usePageSearchParams();
  const { removeQueryItem } = useRemoveQueryListItem([ADMIN_BUNDLE_KEYS.GET_LIST, page]);

  const { mutateAsync: deleteBundle, isPending } = useMutation({
    mutationKey: [ADMIN_BUNDLE_KEYS.DELETE],
    mutationFn: apiDeleteBundle,
    onSuccess: async (deletedId: number) => {
      toast.success(BUNDLE_TOAST_MESSAGES.DELETE_SUCCESS);

      removeQueryItem(deletedId);
    },
    onError: error => {
      toast.error(BUNDLE_TOAST_MESSAGES.DELETE_FAILED, { description: axiosErrorHandler(error) });
    },
  });

  const onDelete = async (id: number) => {
    await deleteBundle({
      id,
    });
  };

  return {
    onDelete,
    isDeletePending: isPending,
  };
};

export default useDeleteBundleListItem;
