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

  // form value 세팅
  useEffect(() => {
    const productsList = selectedProducts.reduce<BundleFormDto['productsList']>((acc, cur) => {
      cur.items.forEach((item, index) => {
        const productKey = getProductName(cur.heading.label as BundleProductLabel);
        acc[productKey] = [
          ...(acc[productKey] ?? []),
          {
            id: item.value,
            quantity: item.quantity,
            sortOrder: index + 1,
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

  // selectedProducts state 세팅
  useEffect(() => {
    const selectedItems = commandGroups.map(group => {
      return {
        heading: group.heading,
        items: group.items
          .filter(item => item.selected)
          .map(item => ({
            ...item,
            quantity: item.quantity ?? 1,
          })),
      };
    });

    setSelectedProducts(selectedItems);
  }, [commandGroups]);

  // command groups 선택 아이템 해제
  const deselectItem = (groupKey: string, itemKey: number) => {
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

  // selectedProducts 아이템 삭제
  const removeSelectedItem = (groupKey: string, itemKey: number) => {
    setSelectedProducts(prev =>
      prev.map(group => {
        if (group.heading.value !== groupKey) return group;
        return { ...group, items: group.items.filter(item => item.value !== itemKey) };
      }),
    );
    deselectItem(groupKey, itemKey);
  };

  // selectedProducts 아이템 수량 업데이트
  const updateQuantity = (groupKey: string, itemKey: number, delta: number) => {
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

  return {
    selectedProducts,
    setSelectedProducts,
    updateQuantity,
    removeSelectedItem,
    allSumPrice,
  };
};

export default useSelectProductList;
