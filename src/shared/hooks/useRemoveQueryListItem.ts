import { IList, ItemBase } from '@shared/typings/commons';
import { useQueryClient } from '@tanstack/react-query';

const useRemoveQueryListItem = <T extends IList<ItemBase>>(key: any[]) => {
  const queryClient = useQueryClient();

  const removeQueryItem = async (deletedId: ItemBase['id']) => {
    queryClient.setQueryData<T>(key, prev => {
      return prev
        ? {
            ...prev,
            items: prev.items.filter(prevItem => prevItem.id !== deletedId),
          }
        : prev;
    });

    await queryClient.invalidateQueries({
      queryKey: key,
    });
  };

  return { queryClient, removeQueryItem };
};

export default useRemoveQueryListItem;
