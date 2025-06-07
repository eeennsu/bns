import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { ICommandGroupBundle } from '@entities/bundle/types';

interface IParams {
  commandGroups: ICommandGroupBundle[];
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
}

const useSelectProductList = ({ commandGroups, setCommandGroups }: IParams) => {
  const [selectedProducts, setSelectedProducts] = useState<ICommandGroupBundle[]>([]);
  const sortedSelectedProducts = useMemo<ICommandGroupBundle[]>(
    () =>
      selectedProducts.map(group => ({
        ...group,
        items: group.items.sort((a, b) => a.price - b.price),
      })),
    [selectedProducts],
  );

  const allSumPrice = selectedProducts.reduce(
    (acc, cur) => acc + cur.items.reduce((a, c) => a + c.price * c.quantity, 0),
    0,
  );

  useEffect(() => {
    if (commandGroups.length === 0) return;

    const selectedItems = commandGroups.map(group => ({
      heading: group.heading,
      items: group.items
        .filter(item => item.selected)
        .map(item => ({
          ...item,
          quantity: 1,
        })),
    }));

    setSelectedProducts(selectedItems);
  }, [commandGroups]);

  const deselectItem = useCallback((groupKey: string, itemKey: string) => {
    setCommandGroups(prev =>
      prev.map(group => {
        if (group.heading.value !== groupKey) return group;

        return {
          ...group,
          items: group.items.map(item => {
            if (item.value !== itemKey) return item;
            const updated = { ...item };
            delete updated.selected;
            return updated;
          }),
        };
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuantity = (groupKey: string, itemKey: string, delta: number) => {
    let removed = false;
    const updatedSelectedProducts = selectedProducts.map(group => {
      if (group.heading.value !== groupKey) return group;

      const updatedItems = group.items.reduce((acc, cur) => {
        if (cur.value !== itemKey) {
          acc.push(cur);
          return acc;
        }

        const newQuantity = cur.quantity + delta;
        if (newQuantity > 0) {
          acc.push({ ...cur, quantity: newQuantity });
        } else {
          removed = true;
        }
        return acc;
      }, []);

      return { ...group, items: updatedItems };
    });

    setSelectedProducts(updatedSelectedProducts);

    if (removed) {
      deselectItem(groupKey, itemKey);
    }
  };

  const removeSelectedItem = (groupKey: string, itemKey: string) => {
    setSelectedProducts(prev =>
      prev.map(group => {
        if (group.heading.value !== groupKey) return group;
        return { ...group, items: group.items.filter(item => item.value !== itemKey) };
      }),
    );
    deselectItem(groupKey, itemKey);
  };

  return {
    selectedProducts,
    sortedSelectedProducts,
    updateQuantity,
    removeSelectedItem,
    allSumPrice,
  };
};

export default useSelectProductList;
