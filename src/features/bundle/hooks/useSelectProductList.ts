import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { BundleFormDto, BundleProductLabel, ICommandGroupBundle } from '@entities/bundle/types';

import { getProductName } from '../libs/getProductName';

interface IParams {
  commandGroups: ICommandGroupBundle[];
  setCommandGroups: Dispatch<SetStateAction<ICommandGroupBundle[]>>;
}

const useSelectProductList = ({ commandGroups, setCommandGroups }: IParams) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<BundleFormDto>();

  const [selectedProducts, setSelectedProducts] = useState<ICommandGroupBundle[]>([]);

  const allSumPrice = selectedProducts.reduce(
    (acc, cur) => acc + cur.items.reduce((a, c) => a + c.price * c.quantity, 0),
    0,
  );

  useEffect(() => {
    console.log('commandGroups', commandGroups);
    const productsList = selectedProducts.reduce<BundleFormDto['productsList']>((acc, cur) => {
      cur.items.forEach((item, index) => {
        const productKey = getProductName(cur.heading.label as BundleProductLabel);
        acc[productKey] = [
          ...(acc[productKey] ?? []),
          {
            id: item.value,
            quantity: item.quantity,
            sortOrder: index + 1,
            price: item.price ?? 0,
          },
        ];
      });
      return acc;
    }, {});

    setValue('productsList', productsList);
    setValue('price', allSumPrice);

    const isProductValid =
      Object.values(productsList)
        .flat()
        .reduce((sum, item) => sum + item.quantity, 0) >= 2;

    if (errors?.productsList && isProductValid) {
      clearErrors('productsList');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts]);

  useEffect(() => {
    const selectedItems = commandGroups.map(group => {
      const existingGroup = selectedProducts.find(g => g.heading.value === group.heading.value);

      return {
        heading: group.heading,
        items: group.items
          .filter(item => item.selected)
          .map(item => {
            const existingItem = existingGroup?.items.find(i => i.value === item.value);
            return {
              ...item,
              quantity: existingItem?.quantity ?? 1,
            };
          }),
      };
    });

    setSelectedProducts(selectedItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandGroups]);

  const deselectItem = (groupKey: string, itemKey: string) => {
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
  };

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
    updateQuantity,
    removeSelectedItem,
    allSumPrice,
  };
};

export default useSelectProductList;
